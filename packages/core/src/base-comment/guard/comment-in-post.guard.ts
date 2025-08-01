// packages/core/src/base-post/board/guard/post-in-board.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  NotFoundException,
  Inject,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BoardPost } from "@base-post/board/entity/board-post.entity";
import { BoardPostStatus } from "@base-post/board/enum/board-post.enum";
import { BoardStatus } from "@base-board/enum/board-config.enum";
import { Comment } from "@base-comment/entity/comment.entity";
import { CommentStatus } from "@base-comment/enum/comment.enum";

@Injectable()
export class CommentInPostGuard implements CanActivate {
  constructor(
    @InjectRepository(BoardPost)
    private readonly boardPostRepository: Repository<BoardPost>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const commentId = request.params.id;

    if (!commentId) {
      throw new BadRequestException("존재하지 않은 댓글입니다.");
    }

    const comment = await this.commentRepository.findOne({
      where: {
        id: commentId,
      },
    });

    if (!comment || comment.status !== CommentStatus.USE) {
      throw new NotFoundException(`삭제되었거나 존재하지 않는 댓글입니다.`);
    }

    // 게시판에 속한 게시물인지 확인
    const post = await this.boardPostRepository.findOne({
      where: {
        id: comment.resourceInfo.resourceId,
      },
      relations: ["boardConfig"], // 게시판 정보도 함께 가져오기
    });

    if (!post || post.status !== BoardPostStatus.USE) {
      throw new NotFoundException(`삭제되었거나 존재하지 않는 게시글입니다.`);
    }

    if (post.boardConfig.status !== BoardStatus.ACTIVE) {
      throw new NotFoundException(`더이상 이용할 수 없는 게시판입니다.`);
    }

    request.comment = comment;

    return true;
  }
}
