import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // FIXME: 개발중 임시 허용
  app.enableCors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3200",
      "http://localhost:3400",
    ],
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
