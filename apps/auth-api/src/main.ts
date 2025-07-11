import * as fs from 'fs';
import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('/cert/localhost-key.pem'),
    cert: fs.readFileSync('/cert/localhost.pem'),
  };
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });

  app.use(cookieParser());

  // FIXME: 개발중 임시 허용
  app.enableCors({
    origin: ['https://localhost:3000'],
    credentials: true,
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
