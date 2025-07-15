import { Module } from "@nestjs/common";
import { BoardService } from "./board.service";
import { BoardController } from "./board.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardConfig } from "@gamecorelabs/nestjs-core/base-board/entity/board-config.entity";
import { BoardPost } from "@gamecorelabs/nestjs-core/base-post/board/entity/board-post.entity";
import { Comment } from "@gamecorelabs/nestjs-core/base-comment/entity/comment.entity";
import { Like } from "@gamecorelabs/nestjs-core/base-like/entity/like.entity";
import { BoardCategory } from "@gamecorelabs/nestjs-core/base-board/entity/board-category.entity";

@Module({
  controllers: [BoardController],
  providers: [BoardService],
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
export class BoardModule {}
