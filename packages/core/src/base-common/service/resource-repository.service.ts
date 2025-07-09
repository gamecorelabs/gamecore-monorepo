import { Injectable, ConflictException, Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ResourceType } from "@gamecoregg/nestjs-core/base-common/enum/common.enum";
import { BaseModel } from "@gamecoregg/nestjs-core/base-common/entity/base.entity";
import { BoardPost } from "@gamecoregg/nestjs-core/base-post/board/entity/board-post.entity";
import { Comment } from "@gamecoregg/nestjs-core/base-comment/entity/comment.entity";

@Injectable()
export class ResourceRepositoryService {
  private readonly repositoryMap: Partial<
    Record<ResourceType, Repository<BaseModel>>
  >;

  constructor(
    @InjectRepository(BoardPost)
    private readonly boardPostRepository: Repository<BoardPost>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>
  ) {
    this.repositoryMap = {
      [ResourceType.BOARD_POST]: this.boardPostRepository,
      [ResourceType.COMMENT]: this.commentRepository,
    };
  }

  getRepository(resourceType: ResourceType): Repository<BaseModel> {
    const repo = this.repositoryMap[resourceType];
    if (!repo) {
      throw new ConflictException(
        `지원하지 않는 리소스 타입입니다: ${resourceType}`
      );
    }
    return repo;
  }
}
