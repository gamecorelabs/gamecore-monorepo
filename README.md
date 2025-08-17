# GameCore 프로젝트 구성도

```
├── .github/
│ └── workflows/
│ └── ci-cd.yml # CI/CD 자동화 스크립트
├── apps/
│ ├── auth-api/ # 인증 관련 처리 서버 (NestJs)
│ ├── admin-api/ # 관리자 기능 처리 서버 (NestJs)
│ ├── data-api/ # 게시판 및 뉴스, 각종 공략 정보 등 처리 서버 (NestJs)
│ └── frontend/ # 프론트 서버 (NextJs, Tailwind 기반)
├── packages # 프로젝트의 핵심 공통 모듈 폴더
│ └── core/ # 각 NestJs 서버에서 공통적으로 사용하는 비즈니스 로직 패키지
│ └── src/
│ └── base-auth # 인증 처리 관련 비즈니스 로직 (회원, 비회원, fingerprint..)
│ └── base-channel # 각 서브 페이지 (채널) 설정 관련 비즈니스 로직
│ └── base-board # 게시판 비즈니스 로직
│ └── base-common # 공통 비즈니스 로직(페이지네이션, 트랜잭션 등)
│ └── base-post # 글쓰기 리소스 비즈니스 로직 (게시판, 뉴스 등)
│ └── base-comment # 댓글 리소스 비즈니스 로직 (게시판, 뉴스 등)
│ └── base-like # 좋아요 리소스 비즈니스 로직 (게시판, 뉴스 등)
│ └── ....
├── traefik # 트래픽 관리 및 리버스 프록시(traefik) 관련 설정 폴더
│ ├── traefik.dev.yml # traefik 개발용 설정파일
│ └── traefik.yml # (참고용) traefik 배포용 설정파일
│
├── docker-compose.dev.yml # 개발 환경용 Docker Compose 설정 파일
├── docker-compose.yml # (참고용) Docker Compose 배포 설정 파일
├── .dockerignore
├── .gitignore
├── README.md
```
