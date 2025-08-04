import { Module } from "@nestjs/common";
import { BasePostService } from "./base-post.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardPost } from "./board/entity/board-post.entity";
import { BoardConfig } from "@base-board/entity/board-config.entity";
import { BoardPostService } from "./board/board-post.service";
import { NewsPostService } from "./news/news-post.service";
import { PostUtilService } from "./util/post-util.service";
import { UserAccount } from "@base-user/entity/user-account.entity";
import { PostInBoardGuard } from "./board/guard/post-in-board.guard";
import { PostInNewsGuard } from "./news/guard/post-in-news.guard";
import { NewsConfig } from "@base-news/entity/news-config.entity";
import { NewsPost } from "./news/entity/news-post.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BoardConfig,
      BoardPost,
      NewsConfig,
      NewsPost,
      UserAccount,
    ]),
  ],
  providers: [
    BasePostService,
    BoardPostService,
    NewsPostService,
    PostUtilService,
    PostInBoardGuard,
    PostInNewsGuard,
  ],
  exports: [
    BasePostService,
    BoardPostService,
    NewsPostService,
    PostUtilService,
    PostInBoardGuard,
    PostInNewsGuard,
  ],
})
export class BasePostModule {}
