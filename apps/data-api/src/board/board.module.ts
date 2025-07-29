import { Module } from "@nestjs/common";
import { BoardService } from "./board.service";
import { BoardController } from "./board.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import {
  BoardConfig,
  BoardPost,
  Comment,
  Like,
  BoardCategory
} from "@gamecorelabs/nestjs-core";

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
