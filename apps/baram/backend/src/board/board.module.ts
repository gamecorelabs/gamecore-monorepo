import { Module } from "@nestjs/common";
import { BoardService } from "./board.service";
import { BoardController } from "./board.controller";
import { PostModule } from "./post/post.module";
import { BaseBoardModule } from "@_core/base-board/base-board.module";
import { BasePostModule } from "@_core/base-post/base-post.module";
import { BaseCommentModule } from "@_core/base-comment/base-comment.module";
import { BaseUserModule } from "@_core/base-user/base-user.module";
import { BaseAuthModule } from "@_core/base-auth/base-auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardConfig } from "@_core/base-board/entity/board-config.entity";
import { BoardPost } from "@_core/base-post/board/entity/board-post.entity";
import { Comment } from "@_core/base-comment/entity/comment.entity";
import { UserAccount } from "@_core/base-user/entity/user-account.entity";

@Module({
  controllers: [BoardController],
  providers: [BoardService],
  imports: [
    TypeOrmModule.forFeature([BoardConfig, BoardPost, Comment]),
    BaseBoardModule,
    BasePostModule,
    BaseCommentModule,
    BaseUserModule,
    BaseAuthModule,
    PostModule,
  ],
})
export class BoardModule {}
