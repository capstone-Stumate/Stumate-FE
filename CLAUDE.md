# CLAUDE.md

AI agent를 위한 Stumate FE 프로젝트 가이드입니다.

---

## 프로젝트 개요

**Stumate**는 사용자의 공부 습관과 학습 흐름을 기록하고, 이를 기반으로 학습 효율 향상 및 피드백을 제공하는 모바일 웹 서비스입니다.

- **기술 스택**: React 19, TypeScript, Vite, Tailwind CSS v4
- **모바일 웹 기준**: max-width 430px
- **패키지 매니저**: pnpm

---

## 주요 명령어

```bash
pnpm dev        # 개발 서버 실행
pnpm build      # 프로덕션 빌드
pnpm lint       # ESLint 실행
pnpm preview    # 빌드 결과 미리보기
```

---

## 🚨 절대 금지 사항

> **IMPORTANT: 다음 조작은 어떠한 경우에도 절대 실행하지 않는다**

```bash
git push --force          # 강제 푸시 금지
git reset --hard          # 하드 리셋 금지
git commit --no-verify    # 훅 우회 금지
git push origin main      # main 직접 푸시 금지 (PR 필수)
pnpm audit fix --force    # 강제 패키지 업데이트 금지
rm -rf                    # 디렉토리 강제 삭제 금지
```

- `.env` 파일 내용을 로그·출력·코드에 포함하지 않는다
- API 키·비밀번호·토큰을 코드에 하드코딩하지 않는다
- 라이브러리 버전을 임의로 변경하지 않는다

## 작업 전 반드시 확인

- ✅ **항상**: TypeScript 에러 및 lint 통과 확인 후 완료 보고
- ⚠️ **먼저 물어보기**: 새 라이브러리 추가, 폴더 구조 변경
- 🚫 **절대 금지**: `node_modules` 수정

---

## 폴더 구조

FSD(Feature-Sliced Design) 기반 구조를 사용합니다.

```
src/
├── app/                        # 앱 전역 설정
│   ├── layouts/                # 레이아웃 컴포넌트
│   ├── router/                 # 라우팅 설정
│   ├── App.tsx
│   └── main.tsx
│
├── assets/                     # SVG 아이콘 등 정적 자원
│
├── pages/                      # 페이지 단위 도메인
│   └── {페이지명}/
│       ├── api/                # 해당 페이지 전용 API
│       ├── components/         # 해당 페이지 전용 컴포넌트
│       ├── hooks/              # 해당 페이지 전용 훅
│       └── {페이지명}Page.tsx
│
└── shared/                     # 공통 자원
    ├── api/                    # axios 인스턴스, endpoints
    ├── ui/                     # 공통 UI 컴포넌트
    │   ├── BottomNav/
    │   ├── Button/
    │   ├── Input/
    │   ├── Modal/
    │   ├── StarRating/
    │   ├── Tag/                # Tag, SubjectTag, DayChip
    │   ├── TimeRangePicker/
    │   └── TodoItem/
    ├── hooks/                  # 공통 훅 (useModal, useToast)
    ├── types/                  # 전역 타입 (ai, auth, schedule, timer, todo, user)
    ├── utils/                  # 공통 유틸 함수 (formatDate, formatTime)
    ├── styles/                 # 전역 스타일 (global.css)
    └── constants/              # 공통 상수 (level, locations, subjects)
```

### 페이지 목록

| 경로 | 설명 |
|------|------|
| `pages/auth/` | 회원가입, 로그인 |
| `pages/onboarding/` | 학습 정보 입력 |
| `pages/planner/` | 플래너 - 통계 |
| `pages/timer/` | 타이머 (조건부 렌더링으로 상태 관리) |
| `pages/mypage/` | 내 정보 |
| `pages/todolist/` | 투두리스트 |

---

## 브랜치 컨벤션

```
main        # 배포 브랜치 (모든 리뷰 완료 후 merge)
develop     # 기능 브랜치 통합
init/기능명/#이슈번호    # 초기 세팅
feat/기능명/#이슈번호    # 새로운 기능 개발
fix/기능명/#이슈번호     # 버그 수정
refactor/기능명/#이슈번호 # 리팩토링
```

- 기능명은 **케밥 케이스** 사용 (ex. `feat/timer-page/#12`)
- 기능 브랜치는 `develop`으로 merge

---

## 커밋 컨벤션

```
type: 커밋 메시지
```

| type | 설명 |
|------|------|
| `init` | 초기 세팅 |
| `feat` | 새로운 기능 |
| `fix` | 버그 수정 |
| `refactor` | 리팩토링 |
| `style` | 스타일 수정 |
| `chore` | 기타 (패키지 설치 등) |

---

## 코드 컨벤션

### 컴포넌트

- 리액트 컴포넌트는 `PascalCase` 사용
- **화살표 함수** + `export default` 사용
- 최상단은 **fragment** 사용
- 의미없는 `div` 지양, 시맨틱 태그 사용
- children이 불필요하면 self-closing 사용 (`<Component />`)

```tsx
const TimerPage = () => {
  return (
    <>
      <h1>타이머</h1>
      <Timer />
    </>
  );
};

export default TimerPage;
```

### 폴더/파일 네이밍

- 폴더명, 파일명은 **케밥 케이스**, 소문자로 시작
- 컴포넌트 파일명만 예외로 **PascalCase** 사용
- `shared/ui/` 하위 컴포넌트에 `index.ts` 생성하지 않음
- import 시 파일 직접 참조 (ex. `import Button from '@/shared/ui/Button/Button'`)

### 타입

- `PascalCase` 네이밍
- `type` 대신 **`interface`** 우선 사용
- Props 타입은 접미사 `Props` (ex. `TimerPageProps`)
- 유니언/튜플/리터럴 등 `interface`로 표현 불가한 경우에만 `type` 사용, 접미사 `Types`

```tsx
interface ButtonProps {
  size: 'sm' | 'md' | 'lg';
  onClick: () => void;
}
```

### 함수

- 동사+명사 형식으로 명확하게 네이밍
  - `get`, `create`, `check`, `convert`, `add`, `filter` 등
- 이벤트 핸들러는 `handle` 접두사 (ex. `handleSubmitClick`)
- boolean 반환 유틸은 `has` 접두사 (ex. `hasEmail`)
- **화살표 함수** 사용

```tsx
const handleResetClick = () => { ... };
const hasEmail = (email: string): boolean => { ... };
```

### 변수

- `const` → `let` 순서 (`var` 금지)
- 상수는 `UPPER_SNAKE_CASE` (ex. `API_KEY`)
- Boolean은 `is` 접두사 (ex. `isActive`)
- 복수 데이터는 끝에 `s` (ex. `users`)
- 문자열 조합은 템플릿 리터럴 사용
- 줄임말 지양, 의미있는 변수명 사용

### 메소드

- 배열 복사는 스프레드 연산자 (`[...originals]`)
- `for` 대신 `forEach` / `map` 사용
- 구조 분해 할당 사용

### key 사용 규칙

- 정적 리스트 → `index` 허용
- 동적 리스트 (추가/정렬) → 반드시 고유 `id` 사용
- 페이지네이션/검색결과처럼 완전 교체되는 경우 → `index` 허용

---

## Tailwind 사용 규칙

- 인라인 클래스 순서: **위치 → 크기 → 여백 → 테두리 → 배경 → 텍스트**
- 특정 요소를 감싸는 wrapper div는 `container`로 네이밍 통일
- 디자인 토큰은 `global.css`의 `@theme` 값 사용

```tsx
// 색상 토큰 사용 예시
<div className="bg-primary text-text">
<p className="text-text-gray text-body font-sans">
```

### 색상 토큰

| 토큰 | hex | 용도 |
|------|-----|------|
| `primary` | `#9DDE78` | 메인 버튼/액션 |
| `primary-dark` | `#84C95F` | 버튼 hover/pressed |
| `primary-light` | `#EAF7E2` | 배경/subtle |
| `text` | `#2F3431` | 기본 텍스트 |
| `text-gray` | `#747474` | 보조 텍스트/아이콘 |
| `bg` | `#F7F8F6` | 페이지 배경 |
| `border` | `#E5E9E2` | 구분선/테두리 |
| `white` | `#FFFFFF` | 카드/컴포넌트 배경 |

---

## Import 규칙

- 절대경로는 `@/` alias 사용 (상대경로 지양)
- 같은 페이지 내부 컴포넌트만 상대경로 허용

```tsx
// Good
import { Button } from '@/shared/ui/Button';
import { useModal } from '@/shared/hooks/useModal';

// Bad
import { Button } from '../../../shared/ui/Button';
```
