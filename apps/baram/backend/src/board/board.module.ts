import { Module } from "@nestjs/common";
import { BoardService } from "./board.service";
import { BoardController } from "./board.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardConfig } from "@_core/base-board/entity/board-config.entity";
import { BoardPost } from "@_core/base-post/board/entity/board-post.entity";
import { Comment } from "@_core/base-comment/entity/comment.entity";
import { Like } from "@_core/base-like/entity/like.entity";
import { CoreModule } from "@_core/core.module";

@Module({
  controllers: [BoardController],
  providers: [BoardService],
  imports: [
    TypeOrmModule.forFeature([BoardConfig, BoardPost, Comment, Like]),
    CoreModule,
  ],
})
export class BoardModule {}
