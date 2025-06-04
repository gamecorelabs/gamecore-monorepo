import { Module } from "@nestjs/common";
import { BoardService } from "./board.service";
import { BoardController } from "./board.controller";
import { PostModule } from "./post/post.module";
import { BaseBoardModule } from "@_core/base-board/base-board.module";
import { BasePostModule } from "@_core/base-post/base-post.module";
import { BaseCommentModule } from "@_core/base-comment/base-comment.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardConfig } from "@_core/base-board/entity/board-config.entity";
import { BoardPost } from "@_core/base-post/entity/board-post.entity";

@Module({
  controllers: [BoardController],
  providers: [BoardService],
  imports: [
    TypeOrmModule.forFeature([BoardConfig, BoardPost]),
    BaseBoardModule,
    BasePostModule,
    BaseCommentModule,
    PostModule,
  ],
})
export class BoardModule {}
