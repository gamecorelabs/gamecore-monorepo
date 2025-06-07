import { Module } from "@nestjs/common";
import { BasePostService } from "./base-post.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardPost } from "./board/entity/board-post.entity";
import { BoardConfig } from "@_core/base-board/entity/board-config.entity";
import { BoardPostService } from "./board/board-post.service";
import { PostUtilService } from "./util/post-util.service";
import { UserAccount } from "@_core/base-user/entity/user-account.entity";

@Module({
  imports: [TypeOrmModule.forFeature([BoardConfig, BoardPost, UserAccount])],
  providers: [BasePostService, BoardPostService, PostUtilService],
  exports: [BasePostService, BoardPostService, PostUtilService],
})
export class BasePostModule {}
