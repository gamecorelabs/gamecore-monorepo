import { Module } from "@nestjs/common";
import { PostService } from "./post.service";
import { PostController } from "./post.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardConfig } from "@_core/base-board/entity/board-config.entity";
import { BoardPost } from "@_core/base-post/board/entity/board-post.entity";
import { Comment } from "@_core/base-comment/entity/comment.entity";
import { Like } from "@_core/base-like/entity/like.entity";

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [TypeOrmModule.forFeature([BoardConfig, BoardPost, Comment, Like])],
})
export class PostModule {}
