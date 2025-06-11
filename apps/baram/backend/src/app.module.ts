import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardModule } from "./board/board.module";
import { BoardConfig } from "@_core/base-board/entity/board-config.entity";
import { BoardPost } from "@_core/base-post/board/entity/board-post.entity";
import { DomainConfig } from "@_core/base-domain/entity/domain-config.entity";
import { Comment } from "@_core/base-comment/entity/comment.entity";
import { UserAccount } from "@_core/base-user/entity/user-account.entity";
import { Like } from "@_core/base-like/entity/like.entity";
import { PostModule } from "./post/post.module";
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
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
        DomainConfig,
        BoardPost,
        UserAccount,
        Comment,
        Like,
      ],
      synchronize: true,
    }),
    BoardModule,
    PostModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
