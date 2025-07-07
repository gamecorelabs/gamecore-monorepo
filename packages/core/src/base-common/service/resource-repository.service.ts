import { Injectable, ConflictException, Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ResourceType } from "@_core/base-common/enum/common.enum";
import { BaseModel } from "@_core/base-common/entity/base.entity";
import { BoardPost } from "@_core/base-post/board/entity/board-post.entity";
import { Comment } from "@_core/base-comment/entity/comment.entity";

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
