FROM node:22-alpine

WORKDIR /apps/admin-api

# .npmrc 파일 복사
COPY .npmrc ./

# 의존성 파일 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 소스 코드 복사
COPY . .

# NestJS 빌드
RUN npm run build:prod

# 포트 노출
EXPOSE 3000

# NestJS 애플리케이션 실행
CMD ["npm", "run", "start:prod"]