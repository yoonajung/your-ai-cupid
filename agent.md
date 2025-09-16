# Your AI Cupid Development Guidelines

AI 어시스턴트용 프로젝트 컨텍스트 파일. Last updated: 2025-09-15

## Active Technologies
- **Backend**: Express.js, Node.js, MongoDB, Gemini API
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Testing**: Jest, Cypress
- **Deployment**: PWA (Progressive Web App)
- **Storage**: MongoDB (채팅 기록), LocalStorage (UI 상태)

## Project Structure
backend/
├── src/
│   ├── models/
│   │   ├── persona.js          # 5가지 AI 페르소나 정의
│   │   ├── chat_session.js     # 채팅 세션 관리
│   │   └── message.js          # 메시지 데이터 모델
│   ├── services/
│   │   ├── gemini_service.js   # Google Gemini API 연동
│   │   ├── chat_service.js     # 채팅 로직
│   │   └── persona_service.js  # 페르소나 전환 로직
│   └── routes/
│       └── chat.js             # API 엔드포인트
└── tests/
├── contract/               # API 계약 테스트
├── integration/            # 통합 테스트
└── unit/                   # 단위 테스트
frontend/
├── src/
│   ├── chat.js                 # 메인 채팅 인터페이스
│   └── components/
│       ├── persona_selector.js # 페르소나 선택 버튼
│       └── chat_history.js     # 대화 기록 사이드바
├── manifest.json              # PWA 설정
└── service-worker.js          # 오프라인 지원

## API Endpoints
- `POST /api/chat` - 메시지 전송 및 AI 응답
- `GET /api/chat/history` - 대화 기록 조회
- `POST /api/chat/new` - 새 채팅 세션 생성

## 5가지 AI 페르소나
1. **코치 큐피트**: 적극적이고 격려하는 관계 코치
2. **닥터 하트**: 심리학적 접근의 전문적 상담
3. **인생 멘토**: 경험 기반의 조언과 지혜
4. **든든한 내 편**: 공감하고 위로하는 지지자
5. **베프**: 친근하고 솔직한 친구 스타일

## Code Style
- **JavaScript**: ES2022, async/await 패턴
- **모듈**: CommonJS (backend), ES6 modules (frontend)
- **에러 처리**: try-catch 블록 필수
- **로깅**: console.log 대신 구조화된 로그
- **네이밍**: camelCase (함수), PascalCase (클래스)

## Performance Requirements
- AI 응답 시간: 2초 이내
- 페르소나 전환: 즉시 반영
- 모바일 최적화: iOS Safari PWA 지원

## Recent Changes
1. **v1.0.0**: 프로젝트 초기 설정 완료
2. **계획**: Gemini API 연동 및 5가지 페르소나 구현
3. **예정**: PWA 설정 및 모바일 최적화

## Development Principles
- **TDD**: 테스트 먼저 작성, 실패 확인 후 구현
- **모듈화**: 페르소나, AI 연동, 대화 기록 각각 독립 모듈
- **사용자 중심**: 20-30대 관계 고민 해결에 집중
- **개인정보 보호**: 대화 내용 암호화 및 안전한 저장

<!-- MANUAL ADDITIONS START -->
<!-- 수동으로 추가한 프로젝트별 특수 요구사항이나 제약사항을 여기에 기록 -->
<!-- MANUAL ADDITIONS END -->