import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCommentService } from "./base-comment.service";
import { BaseCommentController } from "./base-comment.controller";
import { BoardComment } from "./entity/board-comment.entity";
import { BoardPost } from "@_core/base-post/entity/board-post.entity";
import { BoardConfig } from "@_core/base-board/entity/board-config";

@Module({
  imports: [TypeOrmModule.forFeature([BoardConfig, BoardPost, BoardComment])],
  controllers: [BaseCommentController],
  providers: [BaseCommentService],
  exports: [BaseCommentService],
})
export class BaseCommentModule {}
