import { Module } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CommentController } from "./comment.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import {
  BoardConfig,
  BoardPost,
  Comment,
  Like,
  BoardCategory
} from "@gamecorelabs/nestjs-core";

@Module({
  controllers: [CommentController],
  providers: [CommentService],
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
export class CommentModule {}
