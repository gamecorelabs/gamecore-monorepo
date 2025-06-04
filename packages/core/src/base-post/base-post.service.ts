import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  BoardPost,
  PostStatus,
} from "@_core/base-post/board/entity/board-post.entity";
import { Repository } from "typeorm";
import { CreateBoardPostDto } from "@_core/base-post/board/dto/create-board-post.dto";
import { BoardConfig } from "@_core/base-board/entity/board-config.entity";

@Injectable()
export class BasePostService {
  constructor(
    @InjectRepository(BoardConfig)
    private readonly boardConfigRepository: Repository<BoardConfig>,
    @InjectRepository(BoardPost)
    private readonly boardPostRepository: Repository<BoardPost>
  ) {}

  async getPost(board_id: number) {
    const conditions = {
      where: {
        status: PostStatus.USE,
        boardConfig: { id: board_id },
      },
    };

    // FIXME: 관리자인 경우 status와 관계없이 모두 볼 수 있게 조정

    return await this.boardPostRepository.find(conditions);
  }

  async savePost(
    board: BoardConfig,
    dto: CreateBoardPostDto
  ): Promise<BoardPost> {
    const boardPost = this.boardPostRepository.create({
      title: dto.title,
      content: dto.content,
      guest_author_id: dto.guest_author_id ?? "",
      guest_author_password: dto.guest_author_password ?? "",
      boardConfig: board,
    });

    try {
      return await this.boardPostRepository.save(boardPost);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
