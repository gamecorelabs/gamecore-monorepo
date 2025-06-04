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
import { BoardPost } from "@_core/base-post/entity/board-post.entity";

@Injectable()
export class PostInBoardGuard implements CanActivate {
  constructor(
    @InjectRepository(BoardPost)
    private readonly boardPostRepository: Repository<BoardPost>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const boardId = request.params.id;
    const postId = request.params.post_id;

    if (!boardId || !postId) {
      throw new BadRequestException("Board ID와 Post ID가 필요합니다");
    }

    // 게시판에 속한 게시물인지 확인
    const post = await this.boardPostRepository.findOne({
      where: {
        id: postId,
        boardConfig: { id: boardId },
      },
      relations: ["boardConfig"], // 게시판 정보도 함께 가져오기
    });

    if (!post) {
      throw new NotFoundException(
        `게시판 ${boardId}에 게시글 ${postId}가 존재하지 않습니다`
      );
    }

    request.boardPost = post;
    return true; // true를 반환하면 요청 처리 계속 진행
  }
}
