import { Module } from "@nestjs/common";
import { PostService } from "./post.service";
import { PostController } from "./post.controller";
import { BaseBoardModule } from "@_core/base-board/base-board.module";
import { BasePostModule } from "@_core/base-post/base-post.module";
import { BaseCommentModule } from "@_core/base-comment/base-comment.module";
import { BaseUserModule } from "@_core/base-user/base-user.module";
import { BaseAuthModule } from "@_core/base-auth/base-auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardConfig } from "@_core/base-board/entity/board-config.entity";
import { BoardPost } from "@_core/base-post/board/entity/board-post.entity";
import { Comment } from "@_core/base-comment/entity/comment.entity";
import { BaseLikeModule } from "@_core/base-like/base-like.module";
import { Like } from "@_core/base-like/entity/like.entity";

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [
    TypeOrmModule.forFeature([BoardConfig, BoardPost, Comment, Like]),
    BaseBoardModule,
    BasePostModule,
    BaseCommentModule,
    BaseUserModule,
    BaseAuthModule,
    BaseLikeModule,
    PostModule,
  ],
})
export class PostModule {}
