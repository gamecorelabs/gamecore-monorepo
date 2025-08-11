import { Module } from "@nestjs/common";
import { BaseSearchService } from "./base-search.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardPost } from "@base-post/board/entity/board-post.entity";
import { BoardConfig } from "@base-board/entity/board-config.entity";
import { Like } from "@base-like/entity/like.entity";
import { UserAccount } from "@base-user/entity/user-account.entity";
import { BasePostModule } from "@base-post/base-post.module";
import { BaseNewsModule } from "@base-news/base-news.module";
import { Comment } from "@base-comment/entity/comment.entity";
import { NewsConfig } from "@base-news/entity/news-config.entity";
import { NewsPost } from "@base-post/news/entity/news-post.entity";

@Module({
  imports: [
    BasePostModule,
    BaseNewsModule,
    TypeOrmModule.forFeature([
      BoardConfig,
      BoardPost,
      Comment,
      Like,
      NewsConfig,
      NewsPost,
      UserAccount,
    ]),
  ],
  providers: [BaseSearchService],
  exports: [BaseSearchService],
})
export class BaseSearchModule {}
