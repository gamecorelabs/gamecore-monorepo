import { Module } from "@nestjs/common";
import { LikeService } from "./like.service";
import { LikeController } from "./like.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardConfig } from "@gamecorelabs/nestjs-core/base-board/entity/board-config.entity";
import { BoardPost } from "@gamecorelabs/nestjs-core/base-post/board/entity/board-post.entity";
import { Comment } from "@gamecorelabs/nestjs-core/base-comment/entity/comment.entity";
import { Like } from "@gamecorelabs/nestjs-core/base-like/entity/like.entity";
import { BoardCategory } from "@gamecorelabs/nestjs-core/base-board/entity/board-category.entity";

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
