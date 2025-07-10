import { Module } from "@nestjs/common";
import { BaseCommonService } from "./base-common.service";
import { CommonPaginationService } from "./service/common-pagination.service";
import { ResourceRepositoryService } from "./service/resource-repository.service";
import { CommonTransactionService } from "./service/common-transaction.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardConfig } from "@base-board/entity/board-config.entity";
import { BoardPost } from "@base-post/board/entity/board-post.entity";
import { Comment } from "@base-comment/entity/comment.entity";
import { Like } from "@base-like/entity/like.entity";
import { BoardCategory } from "@base-board/entity/board-category.entity";

@Module({
  imports: [TypeOrmModule.forFeature([BoardConfig, BoardPost, BoardCategory, Comment, Like])],
  providers: [
    BaseCommonService,
    CommonPaginationService,
    ResourceRepositoryService,
    CommonTransactionService,
  ],
  exports: [
    BaseCommonService,
    CommonPaginationService,
    ResourceRepositoryService,
    CommonTransactionService,
  ],
})
export class BaseCommonModule {}
