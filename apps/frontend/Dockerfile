FROM node:22-alpine

WORKDIR /apps/frontend

COPY . .

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]