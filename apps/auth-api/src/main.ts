import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  // CORS 설정 - 개발 환경
  app.enableCors({
    origin: ['https://dev.gamecore.co.kr', 'https://localhost:3000'],
    credentials: true,
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
