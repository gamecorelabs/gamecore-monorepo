# apps/auth-api/Dockerfile
FROM node:22-alpine AS builder

WORKDIR /app

# 의존성 설치
COPY package*.json ./
# .npmrc 파일 복사
COPY .npmrc ./
# 의존성 설치
RUN npm ci

# 빌드
COPY . .
RUN npm run build:prod

# 프로덕션 이미지
FROM node:22-alpine AS runner

WORKDIR /app

# 비 root 사용자 생성
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

# 빌드 결과물 복사
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# 소유권 변경
RUN chown -R nestjs:nodejs /app

USER nestjs

EXPOSE 3000

CMD ["npm", "run", "start:prod"]