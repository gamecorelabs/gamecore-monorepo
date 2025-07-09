import { Module } from "@nestjs/common";
import { BaseCommonService } from "./base-common.service";
import { CommonPaginationService } from "./service/common-pagination.service";
import { ResourceRepositoryService } from "./service/resource-repository.service";
import { CommonTransactionService } from "./service/common-transaction.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardConfig } from "@gamecoregg/nestjs-core/base-board/entity/board-config.entity";
import { BoardPost } from "@gamecoregg/nestjs-core/base-post/board/entity/board-post.entity";
import { Comment } from "@gamecoregg/nestjs-core/base-comment/entity/comment.entity";
import { Like } from "@gamecoregg/nestjs-core/base-like/entity/like.entity";

@Module({
  imports: [TypeOrmModule.forFeature([BoardConfig, BoardPost, Comment, Like])],
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
