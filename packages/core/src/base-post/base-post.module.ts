import { Module } from "@nestjs/common";
import { BasePostService } from "./base-post.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardPost } from "./board/entity/board-post.entity";
import { BoardConfig } from "@_core/base-board/entity/board-config.entity";

@Module({
  imports: [TypeOrmModule.forFeature([BoardConfig, BoardPost])],
  providers: [BasePostService],
  exports: [BasePostService],
})
export class BasePostModule {}
