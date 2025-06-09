import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { Comment } from "./entity/comment.entity";

import { CommentStatus } from "@_core/base-comment/enum/comment.enum";
import { UserOrGuestLoginRequest } from "@_core/base-user/types/user.types";
import { ConfigService } from "@nestjs/config";
import * as bcrpyt from "bcrypt";
import { ENV_HASH_ROUNDS } from "@_core/base-common/const/env-keys.const";
import { ResourceType } from "@_core/base-common/enum/common.enum";

@Injectable()
export class BaseCommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly configService: ConfigService
  ) {}

  async saveComment(
    dto: CreateCommentDto,
    user: UserOrGuestLoginRequest
  ): Promise<Comment> {
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

    const comment = this.commentRepository.create({
      ...dto,
      ...userInfo,
      ip_address: user.ip_address,
    });
    return this.commentRepository.save(comment);
  }

  // 특정 리소스의 댓글 조회
  async getCommentsByResource(
    resource_type: ResourceType,
    resource_id: number
  ): Promise<Comment[]> {
    return this.commentRepository.find({
      where: {
        resource_info: {
          resource_type,
          resource_id,
        },
      },
      relations: ["parent", "children"],
      order: { created_at: "DESC" },
    });
  }

  // 댓글 단일 조회
  async getCommentById(id: number): Promise<Comment> {
    const data = await this.commentRepository.findOne({
      where: { id },
      relations: ["parent", "children"],
    });

    if (!data) {
      throw new ConflictException("Comment not found");
    }

    return data;
  }

  // 댓글 수정
  async updateComment(id: number, dto: UpdateCommentDto): Promise<Comment> {
    await this.commentRepository.update(id, dto);
    return this.getCommentById(id);
  }

  // 댓글 삭제 (논리적 삭제)
  async deleteComment(id: number): Promise<void> {
    await this.commentRepository.update(id, { status: CommentStatus.DELETED });
  }

  // 대댓글 생성
  async createReply(parentId: number, dto: CreateCommentDto): Promise<Comment> {
    const parent = await this.getCommentById(parentId);
    if (!parent) {
      throw new Error("Parent comment not found");
    }

    const reply = this.commentRepository.create({
      ...dto,
      parent,
    });

    return this.commentRepository.save(reply);
  }
}
