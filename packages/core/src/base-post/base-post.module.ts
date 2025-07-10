import { Module } from "@nestjs/common";
import { BasePostService } from "./base-post.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardPost } from "./board/entity/board-post.entity";
import { BoardConfig } from "@base-board/entity/board-config.entity";
import { BoardPostService } from "./board/board-post.service";
import { PostUtilService } from "./util/post-util.service";
import { UserAccount } from "@base-user/entity/user-account.entity";
import { PostInBoardGuard } from "./board/guard/post-in-board.guard";

@Module({
  imports: [TypeOrmModule.forFeature([BoardConfig, BoardPost, UserAccount])],
  providers: [
    BasePostService,
    BoardPostService,
    PostUtilService,
    PostInBoardGuard,
  ],
  exports: [
    BasePostService,
    BoardPostService,
    PostUtilService,
    PostInBoardGuard,
  ],
})
export class BasePostModule {}
