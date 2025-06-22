import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult } from "typeorm";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { Comment } from "./entity/comment.entity";

import { CommentStatus } from "@_core/base-comment/enum/comment.enum";
import { UserOrGuestLoginRequest } from "@_core/base-user/types/user.types";
import { ConfigService } from "@nestjs/config";
import { ENV_HASH_ROUNDS } from "@_core/base-common/const/env-keys.const";
import { ResourceType } from "@_core/base-common/enum/common.enum";
import { getUserInfo } from "@_core/base-user/util/get-user-info.util";
import * as bcrpyt from "bcrypt";
import { LikeStatus, LikeType } from "@_core/base-like/enum/like.enum";

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
    const userInfo = await getUserInfo(
      user,
      parseInt(this.configService.get<string>(ENV_HASH_ROUNDS) as string)
    );

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
        status: CommentStatus.USE,
      },
      relations: ["author", "parent", "children"],
      order: { created_at: "DESC" },
    });
  }

  async getCommentsByResourceWithLikeCount(
    resource_type: ResourceType,
    resource_id: number,
    id?: number
  ) {
    const queryBuilder = this.commentRepository
      .createQueryBuilder("comment")
      .leftJoin(
        "like",
        "like",
        `like.resource_id = comment.id
        AND like.resource_type = :likeResourceType
        AND like.status = :likeStatus`,
        {
          likeResourceType: ResourceType.COMMENT,
          likeStatus: LikeStatus.SELECTED,
        }
      )
      .addSelect([
        `COUNT(CASE WHEN like.type = :likeType THEN 1 END) AS likeCount`,
        `COUNT(CASE WHEN like.type = :dislikeType THEN 1 END) AS dislikeCount`,
      ])
      .where("comment.status = :commentStatus", {
        commentStatus: CommentStatus.USE,
      })
      .andWhere("comment.resource_info.resource_id = :commentResourceId", {
        commentResourceId: resource_id,
      })
      .andWhere("comment.resource_info.resource_type = :commentResourceType", {
        commentResourceType: resource_type,
      })
      .groupBy("comment.id")
      .setParameters({
        likeType: LikeType.LIKE,
        dislikeType: LikeType.DISLIKE,
      });

    if (id) {
      queryBuilder.andWhere("comment.id = :id", { id });
    }

    const result = await queryBuilder.getRawAndEntities();
    return result;
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

  async checkOwnerComment(
    id: number,
    user: UserOrGuestLoginRequest
  ): Promise<boolean> {
    const userInfo = await getUserInfo(
      user,
      parseInt(this.configService.get<string>(ENV_HASH_ROUNDS) as string)
    );

    const comment = await this.commentRepository.findOne({
      where: { id, status: CommentStatus.USE },
      relations: ["author"],
    });

    if (!comment) {
      throw new ConflictException("댓글이 존재하지 않습니다.");
    }

    if ("author" in userInfo && comment.author) {
      return comment.author.id === userInfo.author.id;
    } else if ("guest_account" in userInfo && user.type === "guest") {
      const isPasswordValid = await bcrpyt.compare(
        user.guest_account.guest_author_password,
        comment.guest_account.guest_author_password
      );

      if (!isPasswordValid) {
        throw new ConflictException("비밀번호가 일치하지 않습니다.");
      }
      return true;
    } else {
      throw new ConflictException("계정 정보가 올바르지 않습니다.");
    }
  }

  // 댓글 삭제 (soft-delete)
  async deleteComment(id: number): Promise<UpdateResult> {
    return await this.commentRepository.update(id, {
      status: CommentStatus.DELETED,
    });
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
