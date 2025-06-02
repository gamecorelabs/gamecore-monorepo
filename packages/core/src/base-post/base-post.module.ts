import { Module } from "@nestjs/common";
import { BasePostService } from "./base-post.service";
import { BasePostController } from "./base-post.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardPost } from "./entity/board-post.entity";
import { BoardConfig } from "@_core/base-board/entity/board-config";

@Module({
  imports: [TypeOrmModule.forFeature([BoardConfig, BoardPost])],
  controllers: [BasePostController],
  providers: [BasePostService],
  exports: [BasePostService],
})
export class BasePostModule {}
