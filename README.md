## 미트래블 - 여행을 하면서 새로운 인연을 매칭해주는 플랫폼

[원스토어 링크 (현재 서비스 종료)](https://m.onestore.co.kr/ko-kr/apps/appsDetail.omp?prodId=0000778880)

### ✨ 주요 기능

- 관광지 검색 및 추천 : 한국관광공사 공공 api 사용
- 여행 일정 관리
- 여행자 연결 및 커뮤니티 기능
- 데이터 기반 여행 정보 제공

### 🛠 기술 스택

- **프론트엔드**: React, TypeScript
- **상태 관리/데이터 관리**: Zustand / TanStack Query
- **스타일**: Emotion
- **패키지 매니저**: pnpm

### 🚀 설치 및 실행

```bash
git clone https://github.com/meetravel-official/meetravel-front.git
cd meetravel-front
pnpm install
pnpm start
```

### 📄 프로젝트 구조

```
meetravel-front/
├── public
│   └── assets
└── src
    ├── api
    │   ├── hooks
    │   ├── hosts
    │   ├── interfaces
    │   └── routes
    ├── assets
    ├── components
    ├── constants
    ├── dummies  # 더미 데이터 (개발용)
    ├── routes
    ├── states
    ├── styles
    └── utils
```
