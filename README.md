# KickFlip Calendar

KickFlip 2026년 5월 일정을 정리하는 Vite + React + TypeScript 기반 캘린더 웹앱입니다. 기본 일정은 코드에 포함되어 있고, 사용자가 추가한 일정은 브라우저 localStorage에 저장됩니다. PWA 설치와 GitHub Pages 자동 배포를 지원합니다.

## 로컬 실행

```bash
npm install
npm run dev
```

로컬 주소:

```text
http://localhost:5174/
```

## 빌드

```bash
npm run build
```

## 미리보기

```bash
npm run preview
```

미리보기 주소:

```text
http://localhost:4174/
```

## 일정 추가 방법

1. `src/data/schedules.ts`를 직접 수정해 기본 일정 데이터를 추가합니다.
2. 앱 안의 일정 추가 폼에서 날짜, 카테고리, 제목, URL, 메모를 입력합니다.
3. 텍스트 일괄 가져오기 영역에 여러 줄을 붙여넣어 한 번에 추가합니다.

## 텍스트 가져오기 형식

```text
YYYY-MM-DD | 카테고리 | 제목 | URL
```

예시:

```text
2026-05-01 | 유튜브 | [계훈] MC 컷 모음 | https://youtu.be/M9xPQ8DX-C8
```

지원 카테고리:

```text
팬싸, 숏폼, 유튜브, X, 팬즈, 인스타, 공식, 기타
```

## 데이터 저장 방식

기본 일정은 `src/data/schedules.ts`에 포함되어 빌드에 함께 들어갑니다. 앱에서 직접 추가하거나 텍스트로 가져온 일정은 브라우저의 localStorage에 저장되며, 새로고침 후에도 유지됩니다. 기본 일정은 앱 화면에서 삭제되지 않고, 삭제 버튼은 localStorage로 추가한 일정에만 표시됩니다.

## PWA 설치

localhost 또는 HTTPS 배포 주소에서 브라우저의 설치 버튼을 사용할 수 있습니다. 모바일에서는 브라우저 공유 메뉴 또는 더보기 메뉴에서 홈 화면에 추가를 선택하면 됩니다.

오프라인 기본 캐시가 설정되어 있어 한 번 접속한 뒤에는 기본 앱 화면을 오프라인에서도 다시 열 수 있습니다.

## GitHub Pages 배포

`main` 브랜치에 push하면 GitHub Actions가 자동으로 빌드하고 GitHub Pages에 배포합니다.

GitHub 저장소에서 아래 설정을 확인하세요.

```text
Settings > Pages > Build and deployment > Source: GitHub Actions
```

배포 주소:

```text
https://blurkk123-dot.github.io/kickflip-calendar/
```

GitHub Pages 빌드에서는 `GITHUB_PAGES=true` 환경변수로 Vite base가 `/kickflip-calendar/`로 설정됩니다. 로컬 개발, 로컬 빌드, Vercel 빌드에서는 base가 `/`입니다.

## 주요 명령어

```bash
npm run dev
npm run build
npm run preview
```
