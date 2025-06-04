import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BoardPost } from "@_core/base-post/board/entity/board-post.entity";
import { CreateBoardPostDto } from "@_core/base-post/board/dto/create-board-post.dto";
import { Repository } from "typeorm";
import { PostUtilService } from "../util/post-util.service";
import { BoardPostStatus } from "./enum/board-post.enum";

@Injectable()
export class BoardPostService {
  constructor(
    @InjectRepository(BoardPost)
    private readonly boardPostRepository: Repository<BoardPost>,
    private readonly postUtilService: PostUtilService
  ) {}

  async getPosts(board_id: number) {
    const conditions = {
      where: {
        status: BoardPostStatus.USE,
        boardConfig: { id: board_id },
      },
    };

    // FIXME: 관리자인 경우 status와 관계없이 모두 볼 수 있게 조정

    return await this.boardPostRepository.find(conditions);
  }

  async savePost(board_id: number, dto: CreateBoardPostDto) {
    const boardPost = this.boardPostRepository.create({
      title: dto.title,
      content: dto.content,
      guest_author_id: dto.guest_author_id ?? "",
      guest_author_password: dto.guest_author_password ?? "",
      boardConfig: { id: board_id },
    });

    try {
      return await this.boardPostRepository.save(boardPost);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
