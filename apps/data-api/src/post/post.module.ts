import { Module } from "@nestjs/common";
import { PostService } from "./post.service";
import { PostController } from "./post.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import {
  BoardConfig,
  BoardPost,
  Comment,
  Like,
  BoardCategory,
} from "@gamecorelabs/nestjs-core";
import { BoardPostController } from "./board-post.controller";
import { NewsPostController } from "./news-post.controller";
import { MulterModule } from "@nestjs/platform-express";
import { S3StorageFactory } from "./interceptors/s3-storage.factory";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BoardConfig,
      BoardCategory,
      BoardPost,
      Comment,
      Like,
    ]),
    MulterModule.register({}),
  ],
  controllers: [PostController, BoardPostController, NewsPostController],
  providers: [PostService, S3StorageFactory],
})
export class PostModule {}
