import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BoardPost } from "@_core/base-post/entity/board-post.entity";
import { Repository } from "typeorm";
import { CreateBoardPostDto } from "@_core/base-post/dto/create-board-post.dto";
import { BoardConfig } from "@_core/base-board/entity/board-config";

@Injectable()
export class BasePostService {
  constructor(
    @InjectRepository(BoardConfig)
    private readonly boardConfigRepository: Repository<BoardConfig>,
    @InjectRepository(BoardPost)
    private readonly boardPostRepository: Repository<BoardPost>
  ) {}

  async savePost(
    board_id: number,
    dto: CreateBoardPostDto
  ): Promise<BoardPost> {
    const board = await this.boardConfigRepository.findOne({
      where: { id: board_id },
    });

    if (!board) {
      throw new ConflictException(
        "해당 게시판이 존재하지 않으므로 게시글을 생성할 수 없습니다."
      );
    }

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
