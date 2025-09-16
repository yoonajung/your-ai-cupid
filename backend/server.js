require('dotenv').config();
const express = require('express');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = process.env.PORT || 3000;

// Gemini AI 초기화
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// JSON 데이터를 받을 수 있도록 설정
app.use(express.json());

// 정적 파일 제공 (프론트엔드)
app.use(express.static(path.join(__dirname, '../frontend')));

// CORS 문제 해결
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// 페르소나별 시스템 프롬프트
const personaPrompts = {
  '코치 큐피트': `당신은 열정적이고 격려하는 관계 코치입니다. 따뜻하고 긍정적인 어조로 연애와 인간관계 조언을 제공합니다. "큐피드"라는 이름답게 사랑과 관계에 대한 희망적인 메시지를 전달하세요.`,
  
  '닥터 하트': `당신은 심리학 전문가입니다. 학술적이고 전문적인 관점에서 관계 문제를 분석하고 심리학적 인사이트를 제공합니다. 차분하고 신뢰할 수 있는 어조를 사용하세요.`,
  
  '인생 멘토': `당신은 인생 경험이 풍부한 멘토입니다. 살면서 겪은 다양한 경험을 바탕으로 지혜로운 조언을 제공합니다. 따뜻하면서도 현실적인 어조로 대화하세요.`,
  
  '든든한 내 편': `당신은 따뜻하고 공감적인 지지자입니다. 무엇보다 상대방의 감정을 이해하고 위로하는 것을 우선시합니다. 친근하고 안전한 느낌을 주는 어조로 대화하세요.`,
  
  '베프': `당신은 친한 친구처럼 솔직하고 편안한 대화를 나누는 베스트프렌드입니다. 격식없이 친근한 말투를 사용하고, 때로는 직설적이지만 진심어린 조언을 해주세요.`
};

// 메인 페이지 - 프론트엔드 제공
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// 채팅 메시지를 받는 API
app.post('/api/chat', async (req, res) => {
  try {
    const { message, persona = '코치 큐피트' } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: '메시지가 필요합니다.' });
    }

    const systemPrompt = personaPrompts[persona] || personaPrompts['코치 큐피트'];
    const fullPrompt = `${systemPrompt}\n\n사용자 메시지: ${message}\n\n위 역할에 맞게 답변해주세요:`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const aiResponse = response.text();

    res.json({
      message: aiResponse,
      persona: persona
    });

  } catch (error) {
    console.error('Gemini API 오류:', error);
    res.status(500).json({
      message: '죄송합니다. 현재 AI 서비스에 문제가 있습니다. 잠시 후 다시 시도해주세요.',
      persona: req.body.persona || '코치 큐피트'
    });
  }
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행중입니다`);
});