import { Module } from "@nestjs/common";
import { BaseLikeService } from "./base-like.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardConfig } from "@_core/base-board/entity/board-config.entity";
import { BoardPost } from "@_core/base-post/board/entity/board-post.entity";
import { Comment } from "@_core/base-comment/entity/comment.entity";
import { Like } from "./entity/like.entity";
import { BaseCommonModule } from "@_core/base-common/base-common.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardConfig, BoardPost, Comment, Like]),
    BaseCommonModule,
  ],
  providers: [BaseLikeService],
  exports: [BaseLikeService],
})
export class BaseLikeModule {}
