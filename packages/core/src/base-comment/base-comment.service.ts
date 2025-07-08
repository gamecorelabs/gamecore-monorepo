import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult, IsNull, QueryRunner } from "typeorm";
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
import { UserAccount } from "@_core/base-user/entity/user-account.entity";
import { BaseLikeService } from "@_core/base-like/base-like.service";
import { ResourceRepositoryService } from "@_core/base-common/service/resource-repository.service";
import { ResourceInfo } from "@_core/base-common/entity/resource-info.embeddable";
import { CommentRequest } from "@_core/base-comment/types/request-types";
import { CommonTransactionService } from "@_core/base-common/service/common-transaction.service";

@Injectable()
export class BaseCommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(UserAccount)
    private readonly userAccountRepository: Repository<UserAccount>,
    private readonly baseLikeService: BaseLikeService,
    private readonly configService: ConfigService,
    private readonly resourceRepositoryService: ResourceRepositoryService,
    private readonly commonTransactionService: CommonTransactionService
  ) {}

  async getPostCommentList(resourceType: ResourceType, resourceId: number) {
    return await this.getCommentsByResource(resourceType, resourceId);
  }

  async saveComment(
    dto: CreateCommentDto,
    user: UserOrGuestLoginRequest,
    qr?: QueryRunner
  ) {
    const userInfo = await getUserInfo(
      user,
      parseInt(this.configService.get<string>(ENV_HASH_ROUNDS) as string)
    );

    const commentData: Partial<Comment> = {
      ...dto,
      ip_address: user.ip_address,
    };

    if ("author" in userInfo && userInfo.author) {
      commentData.author = this.userAccountRepository.create({
        id: userInfo.author.id,
      });
    } else if ("guest_account" in userInfo) {
      commentData.guest_account = userInfo.guest_account;
    }

    if (dto.parent_id) {
      commentData.parent = this.commentRepository.create({ id: dto.parent_id });
    }

    const manager = this.commonTransactionService.getManagerRepository<Comment>(
      Comment,
      this.commentRepository,
      qr
    );
    const result = await manager.save(commentData);
    await this.refreshCommentCount(dto.resource_info, "increment");

    return result;
  }

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
        parent: IsNull(),
        status: CommentStatus.USE,
      },
      relations: ["author", "children", "children.author"],
      order: { created_at: "ASC" },
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
  async deleteComment(id: number, req: CommentRequest): Promise<UpdateResult> {
    const resource_info = req.comment.resource_info;
    const result = await this.commentRepository.update(id, {
      status: CommentStatus.DELETED,
    });
    await this.refreshCommentCount(resource_info, "decrement");
    return result;
  }

  getIdList(comments: Comment[]): number[] {
    const commentIds = comments.flatMap((comment) => {
      const ids = [comment.id];
      if (comment.children && Array.isArray(comment.children)) {
        ids.push(...comment.children.map((child) => child.id));
      }
      return ids;
    });

    return commentIds;
  }

  mergeLikeCount(
    comments: Comment[],
    likeCounts: Record<number, { likeCount: number; dislikeCount: number }>
  ): Comment[] {
    return comments.map((comment) => {
      const likeData = likeCounts[comment.id] || {
        likeCount: 0,
        dislikeCount: 0,
      };
      const childrenWithLikes = comment.children?.map((child) => {
        const childLikeData = likeCounts[child.id] || {
          likeCount: 0,
          dislikeCount: 0,
        };
        return {
          ...child,
          likeCount: childLikeData.likeCount,
          dislikeCount: childLikeData.dislikeCount,
        };
      });

      return {
        ...comment,
        likeCount: likeData.likeCount,
        dislikeCount: likeData.dislikeCount,
        children: childrenWithLikes,
      };
    });
  }

  async getCommentCountByResourceInId(
    resource_type: ResourceType,
    idList: number[]
  ) {
    const rawCounts = await this.commentRepository
      .createQueryBuilder("comment")
      .select("comment.resource_info.resource_id", "resource_id")
      .addSelect("COUNT(comment.id)", "count")
      .where("comment.resource_info.resource_type = :resourceType", {
        resourceType: resource_type,
      })
      .andWhere("comment.resource_info.resource_id IN (:...idList)", { idList })
      .andWhere("comment.status = :status", {
        status: CommentStatus.USE,
      })
      .groupBy("comment.resource_info.resource_id")
      .getRawMany();

    const commentCounts: Record<number, number> = rawCounts.reduce(
      (acc, row) => {
        acc[row.resource_id] = parseInt(row.count, 10);
        return acc;
      },
      {}
    );

    return commentCounts;
  }

  /**
   * @deprecated Use getCommentsByResource instead
   */
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
      .leftJoinAndSelect("comment.author", "user_account")
      .leftJoinAndSelect("comment.children", "child_comment")
      .leftJoinAndSelect("child_comment.author", "child_author")
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
      .addGroupBy("child_comment.id")
      .addGroupBy("child_author.id")
      .setParameters({
        likeType: LikeType.LIKE,
        dislikeType: LikeType.DISLIKE,
      });

    if (id) {
      queryBuilder.andWhere("comment.id = :id", { id });
    }

    const result = await queryBuilder.getRawAndEntities();

    const mapped = result.entities.map((entity) => {
      const rawResult = result.raw.find((raw) => raw.comment_id === entity.id);

      if (!rawResult) {
        throw new ConflictException("댓글 데이터 검증 실패");
      }

      const likeCount = parseInt(rawResult.likeCount, 10) || 0;
      const dislikeCount = parseInt(rawResult.dislikeCount, 10) || 0;

      // 대댓글 좋아요수 갱신하기
      const mapped_children = entity.children?.map((child) => {
        const childRawResult = result.raw.find(
          (raw) => raw.child_comment_id === child.id
        );
        if (!childRawResult) return [];

        const childLikeCount =
          parseInt(childRawResult.child_likeCount, 10) || 0;
        const childDislikeCount =
          parseInt(childRawResult.child_dislikeCount, 10) || 0;

        return {
          ...child,
          likeCount: childLikeCount,
          dislikeCount: childDislikeCount,
        };
      });

      return {
        ...entity,
        children: mapped_children,
        likeCount,
        dislikeCount,
      };
    });

    return mapped;
  }

  private async refreshCommentCount(
    resource_info: ResourceInfo,
    action: "increment" | "decrement"
  ): Promise<void> {
    const { resource_type, resource_id } = resource_info;

    const repository =
      this.resourceRepositoryService.getRepository(resource_type);

    if (!repository) {
      throw new ConflictException(
        `지원하지 않는 리소스 타입입니다: ${resource_type}`
      );
    }

    await repository[action]({ id: resource_id }, "comment_count", 1);
  }
}
