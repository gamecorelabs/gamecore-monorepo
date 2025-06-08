import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BoardPost } from "@_core/base-post/board/entity/board-post.entity";
import { CreateBoardPostDto } from "@_core/base-post/board/dto/create-board-post.dto";
import { Repository } from "typeorm";
import { PostUtilService } from "../util/post-util.service";
import { BoardPostStatus } from "./enum/board-post.enum";
import { UserAccount } from "@_core/base-user/entity/user-account.entity";
import { UserOrGuestLoginRequest } from "@_core/base-user/types/user.types";
import * as bcrpyt from "bcrypt";
import { ConfigService } from "@nestjs/config";
import { ENV_HASH_ROUNDS } from "@_core/base-common/const/env-keys.const";

@Injectable()
export class BoardPostService {
  constructor(
    @InjectRepository(BoardPost)
    private readonly boardPostRepository: Repository<BoardPost>,
    private readonly postUtilService: PostUtilService,
    private readonly configService: ConfigService
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

  async savePost(dto: CreateBoardPostDto, user: UserOrGuestLoginRequest) {
    //FIXME: 회원 비회원 데이터 처리 유틸화 필요
    let userInfo = {};

    switch (user.type) {
      case "user":
        userInfo = {
          author: { id: user.id },
        };
        break;
      case "guest":
        const hash = await bcrpyt.hash(
          user.guest_author_password,
          parseInt(this.configService.get<string>(ENV_HASH_ROUNDS) as string)
        );
        userInfo = {
          guest_account: {
            guest_author_id: user.guest_author_id,
            guest_author_password: hash,
          },
        };
        break;
      default:
        throw new InternalServerErrorException("사용자 정보가 없습니다.");
    }

    const boardPost = this.boardPostRepository.create({
      ...dto,
      ...userInfo,
    });

    try {
      return await this.boardPostRepository.save(boardPost);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
