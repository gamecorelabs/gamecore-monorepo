import { ClassSerializerInterceptor, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardModule } from "./board/board.module";
import {
  BoardConfig,
  BoardPost,
  ChannelConfig,
  Comment,
  UserAccount,
  Like,
  CoreModule,
  BoardCategory,
} from "@gamecorelabs/nestjs-core";
import { PostModule } from "./post/post.module";
import { CommentModule } from "./comment/comment.module";
import { LikeModule } from "./like/like.module";
import { APP_INTERCEPTOR } from "@nestjs/core";
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      //데이터베이스 타입
      type: "mysql",
      host: process.env["DB_HOST"],
      port: parseInt(process.env["DB_PORT"] as string),
      username: process.env["DB_USERNAME"],
      password: process.env["DB_PASSWORD"],
      database: process.env["DB_DATABASE"],
      entities: [
        BoardConfig,
        BoardCategory,
        ChannelConfig,
        BoardPost,
        UserAccount,
        Comment,
        Like,
      ],
      synchronize: true,
    }),
    CoreModule,
    BoardModule,
    PostModule,
    CommentModule,
    LikeModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
