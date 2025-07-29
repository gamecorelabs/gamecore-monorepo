import { Module } from "@nestjs/common";
import { LikeService } from "./like.service";
import { LikeController } from "./like.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import {
  BoardConfig,
  BoardPost,
  Comment,
  Like,
  BoardCategory
} from "@gamecorelabs/nestjs-core";

@Module({
  controllers: [LikeController],
  providers: [LikeService],
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
export class LikeModule {}
