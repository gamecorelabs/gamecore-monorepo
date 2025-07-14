FROM node:22-alpine

WORKDIR /apps/frontend

#환경변수 파일 복사 (빌드 시점에 필요)
COPY .env.prod .env

COPY . .

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]