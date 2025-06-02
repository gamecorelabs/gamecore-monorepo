import { ConflictException, Injectable } from "@nestjs/common";
import { CreateBoardCommentDto } from "./dto/create-board-comment.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { BoardComment } from "./entity/board-comment.entity";
import { Repository } from "typeorm";
import { BoardPost } from "@_core/base-post/entity/board-post.entity";

@Injectable()
export class BaseCommentService {
  constructor(
    @InjectRepository(BoardPost)
    private readonly boardPostRepository: Repository<BoardPost>,
    @InjectRepository(BoardComment)
    private readonly boardCommentRepository: Repository<BoardComment>
  ) {}

  async saveComment(
    board_id: number,
    post_id: number,
    dto: CreateBoardCommentDto
  ) {
    const post = await this.boardPostRepository.findOne({
      where: {
        id: post_id,
      },
    });

    if (!post) {
      throw new ConflictException(
        "존재하지 않은 게시물이므로 댓글을 저장할 수 없습니다."
      );
    }

    const data = this.boardCommentRepository.create({
      content: dto.content,
      guest_author_id: dto.guest_author_id ?? "",
      guest_author_password: dto.guest_author_password ?? "",
      boardPost: post,
    });

    return await this.boardCommentRepository.save(data);
  }
}
