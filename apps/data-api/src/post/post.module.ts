import { Module } from "@nestjs/common";
import { PostService } from "./post.service";
import { PostController } from "./post.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardConfig } from "@gamecoregg/nestjs-core/base-board/entity/board-config.entity";
import { BoardPost } from "@gamecoregg/nestjs-core/base-post/board/entity/board-post.entity";
import { Comment } from "@gamecoregg/nestjs-core/base-comment/entity/comment.entity";
import { Like } from "@gamecoregg/nestjs-core/base-like/entity/like.entity";
import { BoardPostController } from "./board-post.controller";
import { BoardCategory } from "@gamecoregg/nestjs-core/base-board/entity/board-category.entity";

@Module({
  controllers: [PostController, BoardPostController],
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
