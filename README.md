# 사이드 프로젝트 - GameCore.gg

### 프로젝트 소개
- 종합 게임 포털 웹서비스 '게임코어지지'를 개발중에 있습니다.
- 1인 프로젝트로 진행하고 있기 때문에 개발 편의상 현 repo에서 monorepo 방식으로 통합 개발을 진행하고 있습니다.
- 최종적으로 MSA를 기반으로 각 서브 도메인 별로 독립적인 서비스를 지향하고자 합니다.
- 따라서 추후에는 각 서비스 별로 repo가 분리될 수 있습니다.

### 📂프로젝트 구조

```
gamecoregg/
├── apps/
│ └── … # 서비스 리스트
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
- 실제 실행 가능한 애플리케이션이 위치하는 디렉토리입니다.
- 각 애플리케이션 내에는 backend, frontend로 나뉘어져있습니다
    - 기술스택은 backend는 NestJS, frontend는 Next.js를 채택하고 있습니다
- 공통 서비스 처리 로직(NestJs) 및 공통 UI Component (Next.js, React)는 `/packages` 에서 관리합니다.

### `/packages`
- 프로젝트의 핵심 로직이나 유틸리티, 공유 라이브러리 등이 담긴 모노레포 스타일의 코드 모듈입니다.
- 재사용 가능한 함수, 타입 정의 등 프로젝트 전체에서 사용하는 핵심 기능을 포함합니다.
- `/packages/core`
    - NestJs의 공통 service를 담고있는 코어 모듈입니다.
    - 추후 repo 분리시에는 skeleton nestjs project를 publish 할 예정입니다.
- `/packages/ui-library`
    - Next.js, React의 공통 컴포넌트를 해당 directory에서 관리합니다.
    - 추후 repo 분리시에는 ui-library를 publish 하여 각 front service에 install 하여 사용할 예정입니다.

## 🚀 시작하기 (예시)

```bash
# 의존성 설치
npm install

# 전체 패키지 빌드
npm run build

# Docker로 실행
docker-compose up --build
```
