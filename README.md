# 웹 트래픽 대시보드 · React + Vite

`dashboard-react-vite`는 React 19, Vite, TypeScript, Tailwind CSS 4와 shadcn/ui로 만든 SPA입니다. 로그인하면 같은 기간의 총 방문·일평균·최고 방문을 비교하고, Recharts로 그린 일별 추이와 모바일·PC 비중을 볼 수 있습니다. 한국어와 영어, 라이트·다크 테마를 지원합니다.

## 로컬에서 열기

Node.js 24와 pnpm 10.34.9 기준입니다. 저장소 루트에서 실행하세요.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

[http://localhost:5173](http://localhost:5173)을 엽니다. 공개 데모 계정 **`demo@example.com` / `traffic-demo`**가 로그인 폼에 입력되어 있습니다. `/`는 로그인 상태에 따라 `/login` 또는 `/dashboard`로 이동합니다. 세션은 같은 탭에서 새로고침해도 유지되며, 로그아웃하면 `/dashboard`를 직접 열 수 없습니다. 브라우저 `sessionStorage`로 공개 샘플만 보여 주는 데모입니다.

## 데이터와 화면

데이터는 [2026년 9월 표본](./src/data/traffic.json)이고, [집계 함수](./src/data/traffic.ts)가 마지막 표본 날짜인 9월 30일을 기준으로 계산합니다. 외부 분석 서비스는 필요하지 않습니다.

| 기간 | 총 방문 | 일평균 | 모바일 | PC |
| --- | ---: | ---: | ---: | ---: |
| 7일 (기본) | 10,489 | 1,498 | 6,192 | 4,297 |
| 30일 | 36,639 | 1,221 | 21,532 | 15,107 |

두 기간 모두 최고 방문일은 **9월 29일, 1,790회**입니다. [레이아웃](./src/style/dashboard.css)은 화면 폭 900px 미만에서 차트를 한 열로, 그 이상에서는 2:1 두 열로 배치합니다.

1024px 이상에서는 사이드바를 접어 아이콘만 남길 수 있고, 작은 화면에서는 **메뉴 열기**로 서랍을 엽니다. 상위 메뉴를 펼치면 아래의 독립 화면으로 이동합니다.

| 상위 메뉴 | 하위 메뉴 | 할 수 있는 일 |
| --- | --- | --- |
| 회원 관리 | 회원 목록 · 가입 현황 | 이름·이메일 검색, 이용 정지·재개, 가입 월별 집계 |
| 매출 관리 | 주문 내역 · 매출 요약 | 주문 검색, 입금 확인, 결제 완료 주문의 월별 매출 조회 |
| 사이트 관리 | 기본 설정 · 공지 관리 | 사이트 이름·문의 이메일 저장, 공지 게시·초안 전환 |

관리 개요에서 입금 대기·정지 회원·미게시 공지 수를 누르면 해당 조건의 목록으로 이동합니다. 변경은 현재 데모 세션에만 적용되며 로그아웃하면 초기화됩니다.

방문 보고서 안의 **개요·차트·일별 내역**은 같은 기간을 사용합니다. 조회 기간을 바꾸면 요약·차트·날짜별 표가 함께 바뀝니다. 표는 최근 날짜부터 모바일·PC·합계를 보여 줍니다. 로그인 후 표본과 차트 코드를 별도로 불러오며, 기다리는 영역만 숫자·그래프·도넛·표 행 크기의 스켈레톤으로 표시합니다.

## 페이지 번역 추가

[번역 디렉터리](./public/locales)는 `ko/`와 `en/`으로 나뉩니다. 공통 헤더·푸터는 `common.yml`, 각 화면은 `login.yml`, `dashboard.yml`, `not-found.yml`을 사용합니다.

예를 들어 `/billing`를 추가할 때에는 두 언어 디렉터리에 `billing.yml`을 만들고 페이지에서 `useTranslation('billing')`로 읽습니다. 두 파일의 키와 `{{count}}` 같은 변수 이름은 같아야 합니다. 고정 URL을 정적 서버에서도 직접 열려면 [`vite.config.ts`](./vite.config.ts)의 `spa-page-entries`에 `billing`도 추가하세요.

## 빌드와 검증

```sh
pnpm build                     # 정적 산출물: dist/
pnpm preview                   # 빌드한 앱 미리보기
pnpm tsc
pnpm lint
pnpm test                      # 단위 테스트, 번역 키·변수 일치 검사
pnpm exec playwright install chromium
pnpm test:e2e                  # 로그인, 언어 전환, 차트, 반응형, 404
pnpm audit                     # 개발 의존성 포함
pnpm audit --prod              # 런타임 의존성만
```

[Nginx 설정](./nginx.conf)과 [Vercel 설정](./vercel.json)은 `/login`과 `/dashboard`의 직접 접속을 지원합니다. 없는 주소에는 번역된 404 화면을 표시합니다.

## 같은 화면의 다른 구현

[Vue + Vite (SPA)](https://github.com/0plan/dashboard-vue-vite) · [Next.js (SSR)](https://github.com/0plan/dashboard-react-next) · [Nuxt (SSR)](https://github.com/0plan/dashboard-vue-nuxt)
