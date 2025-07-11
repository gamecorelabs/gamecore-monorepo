FROM node:22-alpine

WORKDIR /apps/frontend

COPY package*.json ./

# 의존성 설치
RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]