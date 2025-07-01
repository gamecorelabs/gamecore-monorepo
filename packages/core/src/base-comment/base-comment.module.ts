import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCommentService } from "./base-comment.service";
import { Comment } from "./entity/comment.entity";
import { BoardPost } from "@_core/base-post/board/entity/board-post.entity";
import { BoardConfig } from "@_core/base-board/entity/board-config.entity";
import { Like } from "@_core/base-like/entity/like.entity";
import { CommentInPostGuard } from "./guard/comment-in-post.guard";
import { UserAccount } from "@_core/base-user/entity/user-account.entity";
import { BaseUserModule } from "@_core/base-user/base-user.module";

@Module({
  imports: [
    BaseUserModule,
    TypeOrmModule.forFeature([
      BoardConfig,
      BoardPost,
      Comment,
      Like,
      UserAccount,
    ]),
  ],
  providers: [BaseCommentService, CommentInPostGuard],
  exports: [BaseCommentService, CommentInPostGuard],
})
export class BaseCommentModule {}
