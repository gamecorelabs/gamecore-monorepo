# 사이드 프로젝트 - GameCore

### 프로젝트 소개
- 종합 게임 포털 '게임코어' 프로젝트를 개발 진행중에 있습니다.
- 1인 프로젝트로 진행하고 있기 때문에 개발 편의상 현 repo에서 monorepo 방식으로 통합 개발을 진행하고 있습니다.
- 자세한 프로젝트 설명 및 구조에 대해서는 아래의 Notion 링크를 참고해주세요.
- <a href="https://gamecore-doc.notion.site/" target="_blank">프로젝트 소개 notion 링크</a>

# GameCore 프로젝트 구성도

```
├── .github/
│   └── workflows/
│       └── ci-cd.yml                 # CI/CD 자동화 스크립트
│
├── apps/
│   ├── auth-api/                     # 인증 서버 (NestJS)
│   ├── admin-api/                    # 관리자 기능 서버 (NestJS)
│   ├── data-api/                     # 게시판/뉴스/공략 등 서버 (NestJS)
│   └── frontend/                     # 프론트엔드 서버 (Next.js, Tailwind)
│
├── packages/                         # 공통 모듈 폴더
│   └── core/
│       └── src/
│           ├── base-auth/            # 인증 처리 비즈니스 로직 (회원/비회원, fingerprint 등)
│           ├── base-domain/          # 도메인 설정 비즈니스 로직
│           ├── base-board/           # 게시판 비즈니스 로직
│           ├── base-common/          # 공통 비즈니스 로직 (페이지네이션, 트랜잭션 등)
│           ├── base-post/            # 글쓰기 리소스 비즈니스 로직
│           ├── base-comment/         # 댓글 리소스 비즈니스 로직
│           ├── base-like/            # 좋아요 리소스 비즈니스 로직
│           └── ...                   # 기타 공통 모듈
│
├── traefik/                          # 트래픽 관리 및 리버스 프록시 설정
│   ├── traefik.dev.yml               # 개발 환경용 traefik 설정
│   └── traefik.yml                   # 배포 환경(참고용) traefik 설정
│
├── docker-compose.dev.yml            # 개발 환경용 Docker Compose
├── docker-compose.yml                # 배포 환경(참고용) Docker Compose
├── .dockerignore
├── .gitignore
├── README.md
```
