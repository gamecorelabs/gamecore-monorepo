import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";
import * as fs from "fs";

async function bootstrap() {
  const isDev = process.env.NODE_ENV !== "production";
  const port = process.env.PORT || 3000;

  const httpsOptions = {
    key: fs.readFileSync("../../cert/localhost-key.pem"),
    cert: fs.readFileSync("../../cert/localhost.pem"),
  };
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });

  app.use(cookieParser());

  // FIXME: 개발중 임시 허용
  app.enableCors({
    origin: ["http://localhost:3000"],
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

  if (isDev) {
    await app.listen(port, "0.0.0.0");
  } else {
    await app.listen(port);
  }
}
bootstrap();
