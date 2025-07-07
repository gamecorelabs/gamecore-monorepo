import { Module } from "@nestjs/common";
import { BaseCommonService } from "./base-common.service";
import { CommonPaginateService } from "./service/common-paginate.service";
import { ResourceRepositoryService } from "./service/resource-repository.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardConfig } from "@_core/base-board/entity/board-config.entity";
import { BoardPost } from "@_core/base-post/board/entity/board-post.entity";
import { Comment } from "@_core/base-comment/entity/comment.entity";
import { Like } from "@_core/base-like/entity/like.entity";

@Module({
  imports: [TypeOrmModule.forFeature([BoardConfig, BoardPost, Comment, Like])],
  providers: [
    BaseCommonService,
    CommonPaginateService,
    ResourceRepositoryService,
  ],
  exports: [
    BaseCommonService,
    CommonPaginateService,
    ResourceRepositoryService,
  ],
})
export class BaseCommonModule {}
