# Your AI Cupid - 관계 코칭 챗봇

AI 기반 실시간 관계 코칭 및 소통 서비스. 5가지 개성 있는 AI 페르소나와 함께 연애와 인간관계 고민을 나누어 보세요.

## 주요 기능

- **5가지 AI 페르소나**: 코치 큐피트, 닥터 하트, 인생 멘토, 든든한 내 편, 베프
- **실시간 AI 대화**: Google Gemini 2.0 Flash 기반
- **페르소나 즉시 전환**: 대화 중 언제든 상담 스타일 변경 가능
- **반응형 디자인**: 데스크톱과 모바일 모두 최적화
- **마크다운 렌더링**: 볼드체, 기울임체 등 서식 지원

## 기술 스택

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Backend**: Node.js, Express.js
- **AI**: Google Gemini API
- **배포**: Vercel

## 실행 방법

### 로컬 환경
```bash
# 저장소 클론
git clone https://github.com/yoonajung/your-ai-cupid.git

# 백엔드 의존성 설치
cd backend
npm install

# 환경 변수 설정
echo "GEMINI_API_KEY=your_api_key_here" > .env

# 서버 실행
npm start
