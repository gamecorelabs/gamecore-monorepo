import { Module } from "@nestjs/common";
import { BaseLikeService } from "./base-like.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardConfig } from "@base-board/entity/board-config.entity";
import { BoardPost } from "@base-post/board/entity/board-post.entity";
import { Comment } from "@base-comment/entity/comment.entity";
import { Like } from "./entity/like.entity";
import { BaseCommonModule } from "@base-common/base-common.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardConfig, BoardPost, Comment, Like]),
    BaseCommonModule,
  ],
  providers: [BaseLikeService],
  exports: [BaseLikeService],
})
export class BaseLikeModule {}
