FROM node:22-alpine

# 컨테이너 내 작업 디렉토리 설정
WORKDIR /apps/admin-api

# context 기준으로 package.json들 복사 → 컨테이너 내부 /dev/data-api에 복사됨
COPY package*.json ./

# 의존성 설치
RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start:dev"]