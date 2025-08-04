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

@Module({
  controllers: [PostController, BoardPostController, NewsPostController],
  providers: [PostService],
  imports: [
    TypeOrmModule.forFeature([
      BoardConfig,
      BoardCategory,
      BoardPost,
      Comment,
      Like,
    ]),
  ],
})
export class PostModule {}
