import { Module } from "@nestjs/common";
import { BoardService } from "./board.service";
import { BoardController } from "./board.controller";
import { PostModule } from "./post/post.module";
import { BaseBoardModule } from "@_core/base-board/base-board.module";

@Module({
  controllers: [BoardController],
  providers: [BoardService],
  imports: [BaseBoardModule, PostModule],
})
export class BoardModule {}
