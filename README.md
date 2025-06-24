# 사이드 프로젝트 - GameCore.gg

### 프로젝트 소개
- 종합 게임 포털 웹서비스 '게임코어지지'를 개발중에 있습니다.
- 1인 프로젝트로 진행하고 있기 때문에 개발 편의상 현 repo에서 monorepo 방식으로 통합 개발을 진행하고 있습니다.
- 최종적으로 MSA를 기반으로 각 서브 도메인별 서비스를 지향하고자 합니다.
- 따라서 추후에는 각 서비스 별로 repo가 분리될 수 있습니다.

### 📂프로젝트 구조

```
gamecoregg/
├── apps/
│ └── frontend/ # 단일 프론트앤드 서버
│ └── {service}-api # 각종 서비스 api 백앤드 서버
│ ....
├── packages/
│ └── core/ # 공통 핵심 모듈
├── .dockerignore
├── .eslintrc.base.js
├── .gitignore
├── docker-compose.yaml 
├── package.json 
├── tsconfig.base.json # TypeScript 공통 설정
└── tsconfig.json
```

### `/apps`
- 프론트 서버 & 각종 서비스 api 백엔드 서버로 디렉터리가 구분 되어있습니다.
- NestJS ^11, Next.js ^15 기반의 기술 스택으로 진행하고 있습니다.

### `/packages`
- 프로젝트의 공통 핵심 로직이나 유틸리티 함수, 타입 등을 관리하는 shared 디렉터리 입니다.
- `/packages/core`
    - gamecoregg의 공통 코어 service 로직들을 담고있는 코어 모듈 패키지입니다.
    - 추후 repo 분리시에는 해당 패키지를 포함한 skeleton nestjs api project를 구성 할 수 있게 배포 할 예정입니다.
- `/packages/utils`
    - 공통으로 쓰이는 각종 유틸 함수들을 관리하는 패키지입니다.

## 🚀 시작하기 (예시)

```bash
# 의존성 설치
npm install

# 전체 패키지 빌드
npm run build

# Docker로 실행
docker-compose up --build
```
