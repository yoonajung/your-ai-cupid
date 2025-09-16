# Tasks: Your AI Cupid - 관계 코칭 챗봇 앱

**Input**: Design documents from `/specs/001-ai-cupid-core/`
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/

## Execution Flow (main)
```
1. Load plan.md from feature directory
   → If not found: ERROR "No implementation plan found"
   → Extract: tech stack, libraries, structure
2. Load optional design documents:
   → data-model.md: Extract entities → model tasks
   → contracts/: Each file → contract test task
   → research.md: Extract decisions → setup tasks
3. Generate tasks by category:
   → Setup: project init, dependencies, linting
   → Tests: contract tests, integration tests
   → Core: models, services, CLI commands
   → Integration: DB, middleware, logging
   → Polish: unit tests, performance, docs
4. Apply task rules:
   → Different files = mark [P] for parallel
   → Same file = sequential (no [P])
   → Tests before implementation (TDD)
5. Number tasks sequentially (T001, T002...)
6. Generate dependency graph
7. Create parallel execution examples
8. Validate task completeness:
   → All contracts have tests?
   → All entities have models?
   → All endpoints implemented?
9. Return: SUCCESS (tasks ready for execution)
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions
- **Web app**: `backend/src/`, `frontend/src/`
- Paths shown below assume web app structure per plan.md

## Phase 3.1: Setup
- [ ] T001 Create web app structure: backend/, frontend/, tests/
- [ ] T002 Initialize Express.js backend with Gemini API dependencies
- [ ] T003 [P] Configure ESLint and Prettier for JavaScript

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**
- [ ] T004 [P] Contract test POST /api/chat in tests/contract/test_chat_post.js
- [ ] T005 [P] Contract test GET /api/chat/history in tests/contract/test_chat_history.js
- [ ] T006 [P] Integration test Gemini API connection in tests/integration/test_gemini_api.js
- [ ] T007 [P] Integration test persona switching in tests/integration/test_persona_switch.js

## Phase 3.3: Core Implementation (ONLY after tests are failing)
- [ ] T008 [P] Persona model in backend/src/models/persona.js
- [ ] T009 [P] ChatSession model in backend/src/models/chat_session.js
- [ ] T010 [P] Message model in backend/src/models/message.js
- [ ] T011 [P] GeminiService for API integration in backend/src/services/gemini_service.js
- [ ] T012 [P] ChatService for session management in backend/src/services/chat_service.js
- [ ] T013 POST /api/chat endpoint in backend/src/routes/chat.js
- [ ] T014 GET /api/chat/history endpoint in backend/src/routes/chat.js
- [ ] T015 Persona switching logic in backend/src/services/persona_service.js

## Phase 3.4: Integration
- [ ] T016 Connect ChatService to MongoDB
- [ ] T017 Gemini API error handling and retry logic
- [ ] T018 Session management middleware
- [ ] T019 Request logging and persona tracking
- [ ] T020 Frontend chat interface in frontend/src/chat.js
- [ ] T021 Persona selection buttons in frontend/src/components/persona_selector.js
- [ ] T022 Chat history sidebar in frontend/src/components/chat_history.js

## Phase 3.5: Polish
- [ ] T023 [P] Unit tests for persona switching in tests/unit/test_persona_logic.js
- [ ] T024 Performance tests (2초 이내 AI 응답)
- [ ] T025 [P] PWA manifest.json and service worker
- [ ] T026 CSS styling for mobile responsiveness
- [ ] T027 Error handling UI components
- [ ] T028 Run manual testing with all 5 personas

## Dependencies
- Tests (T004-T007) before implementation (T008-T015)
- T008-T010 (models) before T011-T012 (services)
- T011-T012 (services) before T013-T014 (endpoints)
- T016-T017 (backend integration) before T020-T022 (frontend)
- Implementation before polish (T023-T028)

## Parallel Example
```
# Launch T008-T010 together (different model files):
Task: "Persona model in backend/src/models/persona.js"
Task: "ChatSession model in backend/src/models/chat_session.js"
Task: "Message model in backend/src/models/message.js"

# Launch T021-T022 together (different component files):
Task: "Persona selection buttons in frontend/src/components/persona_selector.js"
Task: "Chat history sidebar in frontend/src/components/chat_history.js"
```

## Notes
- [P] tasks = different files, no dependencies
- Verify tests fail before implementing
- Commit after each task
- Avoid: vague tasks, same file conflicts

## Task Generation Rules
*Applied during main() execution*

1. **From Contracts**:
   - Chat API contract → T004, T013
   - History API contract → T005, T014
   
2. **From Data Model**:
   - Persona entity → T008
   - ChatSession entity → T009
   - Message entity → T010
   
3. **From User Stories**:
   - Persona switching → T007, T015
   - Chat history → T022

## Validation Checklist
*GATE: Checked by main() before returning*

- [ ] All contracts have corresponding tests
- [ ] All entities have model tasks
- [ ] All tests come before implementation
- [ ] Parallel tasks truly independent
- [ ] Each task specifies exact file path
- [ ] No task modifies same file as another [P] task