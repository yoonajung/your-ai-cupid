# Implementation Plan: Your AI Cupid - 관계 코칭 챗봇 앱

**Branch**: `001-ai-cupid-core` 
**Date**: 2025-09-15 
**Spec**: 5가지 페르소나 기반 개인 관계 상담 챗봇 서비스
**Input**: 20-30대 관계/소통 고민 해결을 위한 AI 코칭 플랫폼

## Execution Flow (/plan command scope)
```
1. Load feature spec from Input path
   → If not found: ERROR "No feature spec at {path}"
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → Detect Project Type from context (web=frontend+backend, mobile=app+api)
   → Set Structure Decision based on project type
3. Evaluate Constitution Check section below
   → If violations exist: Document in Complexity Tracking
   → If no justification possible: ERROR "Simplify approach first"
   → Update Progress Tracking: Initial Constitution Check
4. Execute Phase 0 → research.md
   → If NEEDS CLARIFICATION remain: ERROR "Resolve unknowns"
5. Execute Phase 1 → contracts, data-model.md, quickstart.md, agent-specific template file (e.g., `CLAUDE.md` for Claude Code, `.github/copilot-instructions.md` for GitHub Copilot, or `GEMINI.md` for Gemini CLI).
6. Re-evaluate Constitution Check section
   → If new violations: Refactor design, return to Phase 1
   → Update Progress Tracking: Post-Design Constitution Check
7. Plan Phase 2 → Describe task generation approach (DO NOT create tasks.md)
8. STOP - Ready for /tasks command
```

**IMPORTANT**: The /plan command STOPS at step 7. Phases 2-4 are executed by other commands:
- Phase 2: /tasks command creates tasks.md
- Phase 3-4: Implementation execution (manual or via tools)

## Summary
관계와 소통에 어려움을 겪는 20-30대를 위한 개인 맞춤형 AI 관계 코칭 앱 - 5가지 페르소나(코치 큐피트, 닥터 하트, 인생 멘토, 든든한 내 편, 베프)와 1:1 상담 가능

## Technical Context
**Language/Version**: JavaScript ES2022, HTML5, CSS3  
**Primary Dependencies**: Express.js (백엔드), Vanilla JavaScript (프론트엔드), Google Gemini API (AI 페르소나) 
**Storage**: MongoDB (대화 기록, 사용자 세션), LocalStorage (임시 UI 상태)  
**Testing**: Jest (JavaScript 테스팅), Cypress (E2E 테스팅)  
**Target Platform**: 웹 브라우저 (Chrome, Safari, Firefox) + iOS Safari (PWA)  
**Project Type**: web (frontend + backend)  
**Performance Goals**: AI 응답 시간 2초 이하, 페르소나 전환 즉시 반영  
**Constraints**: 개인정보 보호, 대화 내용 암호화, 오프라인 대화 기록 접근  
**Scale/Scope**: 개인 사용자별 독립 세션, 5가지 페르소나, 대화 기록 관리, 새 채팅 생성

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Simplicity**:
- Projects: 2개 (frontend, backend) - 개인용 앱으로 단순화
- Using framework directly? Express.js 직접 사용, 불필요한 래퍼 없음
- Single data model? 대화 메시지와 사용자 세션 중심의 단순 모델
- Avoiding patterns? Repository 패턴 없이 직접 DB 접근

**Architecture**:
- EVERY feature as library? 페르소나 관리, AI 연동, 대화 기록 모듈화
- Libraries listed? persona-manager (페르소나 전환), gemini-connector (Gemini API), chat-history (대화 기록)
- CLI per library? 각 모듈별 테스트/디버그 스크립트 제공
- Library docs: AI 페르소나별 컨텍스트 문서화

**Testing (NON-NEGOTIABLE)**:
- RED-GREEN-Refactor cycle enforced? ✅ 테스트 먼저, 실패 확인 후 구현
- Git commits show tests before implementation? ✅ 커밋 순서 준수
- Order: Gemini API 연결 테스트 → 페르소나 전환 테스트 → 대화 기록 테스트 → UI 테스트
- Real dependencies used? 실제 Gemini API 연결, 실제 MongoDB 사용
- Integration tests for: 새 모듈, API 계약 변경, 페르소나 전환 로직

**Observability**:
- Structured logging included? ✅ 사용자 대화 로그, 페르소나 전환 로그, 에러 로그
- Frontend logs → backend? ✅ 클라이언트 에러도 서버로 전송
- Error context sufficient? ✅ 사용자 세션 ID, 페르소나 타입, 타임스탬프 포함

**Versioning**:
- Version number assigned? v1.0.0 (MAJOR.MINOR.BUILD)
- BUILD increments on every change? ✅ 모든 변경사항마다 빌드 번호 증가
- Breaking changes handled? API 호환성 유지 계획

## Project Structure

### Documentation (this feature)
```
specs/[###-feature]/
├── plan.md              # This file (/plan command output)
├── research.md          # Phase 0 output (/plan command)
├── data-model.md        # Phase 1 output (/plan command)
├── quickstart.md        # Phase 1 output (/plan command)
├── contracts/           # Phase 1 output (/plan command)
└── tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```

### Source Code (repository root)
```
# Option 1: Single project (DEFAULT)
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# Option 2: Web application (when "frontend" + "backend" detected)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

# Option 3: Mobile + API (when "iOS/Android" detected)
api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure]
```

**Structure Decision**: Option 2 (Web application) - Vanilla JS frontend + Express.js backend, 개인용 관계 코칭 앱 구조

## Phase 0: Outline & Research
1. **Extract unknowns from Technical Context** above:
   - For each NEEDS CLARIFICATION → research task
   - For each dependency → best practices task
   - For each integration → patterns task

2. **Generate and dispatch research agents**:
   ```
   For each unknown in Technical Context:
     Task: "Research {unknown} for {feature context}"
   For each technology choice:
     Task: "Find best practices for {tech} in {domain}"
   ```

3. **Consolidate findings** in `research.md` using format:
   - Decision: [what was chosen]
   - Rationale: [why chosen]
   - Alternatives considered: [what else evaluated]

**Output**: research.md with all NEEDS CLARIFICATION resolved

## Phase 1: Design & Contracts
*Prerequisites: research.md complete*

1. **Extract entities from feature spec** → `data-model.md`:
   - Entity name, fields, relationships
   - Validation rules from requirements
   - State transitions if applicable

2. **Generate API contracts** from functional requirements:
   - For each user action → endpoint
   - Use standard REST/GraphQL patterns
   - Output OpenAPI/GraphQL schema to `/contracts/`

3. **Generate contract tests** from contracts:
   - One test file per endpoint
   - Assert request/response schemas
   - Tests must fail (no implementation yet)

4. **Extract test scenarios** from user stories:
   - Each story → integration test scenario
   - Quickstart test = story validation steps

5. **Update agent file incrementally** (O(1) operation):
   - Run `/scripts/powershell/update-agent-context.ps1 -AgentType cursor` for your AI assistant
   - If exists: Add only NEW tech from current plan
   - Preserve manual additions between markers
   - Update recent changes (keep last 3)
   - Keep under 150 lines for token efficiency
   - Output to repository root

**Output**: data-model.md, /contracts/*, failing tests, quickstart.md, agent-specific file

## Phase 2: Task Planning Approach
*This section describes what the /tasks command will do - DO NOT execute during /plan*

**Task Generation Strategy**:
- Load `/templates/tasks-template.md` as base
- Generate tasks from Phase 1 design docs (contracts, data model, quickstart)
- Each contract → contract test task [P]
- Each entity → model creation task [P] 
- Each user story → integration test task
- Implementation tasks to make tests pass

**Ordering Strategy**:
- TDD order: Tests before implementation 
- Dependency order: Models before services before UI
- Mark [P] for parallel execution (independent files)

**Estimated Output**: 12-15개 번호순 작업 목록 (개인용 앱 구조로 작업 단순화)

**IMPORTANT**: This phase is executed by the /tasks command, NOT by /plan

## Phase 3+: Future Implementation
*These phases are beyond the scope of the /plan command*

**Phase 3**: Task execution (/tasks command creates tasks.md)  
**Phase 4**: Implementation (execute tasks.md following constitutional principles)  
**Phase 5**: Validation (run tests, execute quickstart.md, performance validation)

## Complexity Tracking
*Fill ONLY if Constitution Check has violations that must be justified*

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |


## Progress Tracking
*This checklist is updated during execution flow*

**Phase Status**:
- [ ] Phase 0: Research complete (/plan command)
- [ ] Phase 1: Design complete (/plan command)
- [ ] Phase 2: Task planning complete (/plan command - describe approach only)
- [ ] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [ ] Initial Constitution Check: PASS
- [ ] Post-Design Constitution Check: PASS
- [ ] All NEEDS CLARIFICATION resolved
- [ ] Complexity deviations documented

---
*Based on Constitution v2.1.1 - See `/memory/constitution.md`*