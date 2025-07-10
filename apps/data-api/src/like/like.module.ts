import { Module } from "@nestjs/common";
import { LikeService } from "./like.service";
import { LikeController } from "./like.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardConfig } from "@gamecoregg/nestjs-core/base-board/entity/board-config.entity";
import { BoardPost } from "@gamecoregg/nestjs-core/base-post/board/entity/board-post.entity";
import { Comment } from "@gamecoregg/nestjs-core/base-comment/entity/comment.entity";
import { Like } from "@gamecoregg/nestjs-core/base-like/entity/like.entity";
import { BoardCategory } from "@gamecoregg/nestjs-core/base-board/entity/board-category.entity";

@Module({
  controllers: [LikeController],
  providers: [LikeService],
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
export class LikeModule {}
