// packages/core/src/base-post/board/guard/post-in-board.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BoardPost } from "@_core/base-post/board/entity/board-post.entity";
import { BoardPostStatus } from "../enum/board-post.enum";
import { BoardStatus } from "@_core/base-board/enum/board-config.enum";

@Injectable()
export class PostInBoardGuard implements CanActivate {
  constructor(
    @InjectRepository(BoardPost)
    private readonly boardPostRepository: Repository<BoardPost>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const postId = request.params.id;

    if (!postId) {
      throw new BadRequestException("존재하지 않은 게시물입니다.");
    }

    // 게시판에 속한 게시물인지 확인
    const post = await this.boardPostRepository.findOne({
      where: {
        id: postId,
      },
      relations: ["boardConfig"], // 게시판 정보도 함께 가져오기
    });

    if (!post || post.status !== BoardPostStatus.USE) {
      throw new NotFoundException(`삭제되었거나 존재하지 않는 게시글입니다.`);
    }

    if (post.boardConfig.status !== BoardStatus.ACTIVE) {
      throw new NotFoundException(`더이상 이용할 수 없는 게시판입니다.`);
    }

    request.boardPost = post;

    return true;
  }
}
