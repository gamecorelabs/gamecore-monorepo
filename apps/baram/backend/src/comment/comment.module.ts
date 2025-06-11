import { Module } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CommentController } from "./comment.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardConfig } from "@_core/base-board/entity/board-config.entity";
import { BoardPost } from "@_core/base-post/board/entity/board-post.entity";
import { Comment } from "@_core/base-comment/entity/comment.entity";

import { Like } from "@_core/base-like/entity/like.entity";
import { CoreModule } from "@_core/core.module";

@Module({
  controllers: [CommentController],
  providers: [CommentService],
  imports: [
    TypeOrmModule.forFeature([BoardConfig, BoardPost, Comment, Like]),
    CoreModule,
  ],
})
export class CommentModule {}
