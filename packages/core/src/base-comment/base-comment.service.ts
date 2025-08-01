import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  Repository,
  UpdateResult,
  IsNull,
  QueryRunner,
  Brackets,
} from "typeorm";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { Comment } from "./entity/comment.entity";

import { CommentStatus } from "@base-comment/enum/comment.enum";
import { UserOrGuestLoginRequest } from "@base-user/types/user.types";
import { ConfigService } from "@nestjs/config";
import { ENV_HASH_ROUNDS } from "@base-common/const/env-keys.const";
import { ResourceType } from "@base-common/enum/common.enum";
import { getUserInfo } from "@base-user/util/get-user-info.util";
import * as bcrpyt from "bcrypt";
import { LikeStatus, LikeType } from "@base-like/enum/like.enum";
import { UserAccount } from "@base-user/entity/user-account.entity";
import { BaseLikeService } from "@base-like/base-like.service";
import { ResourceRepositoryService } from "@base-common/service/resource-repository.service";
import { ResourceInfo } from "@base-common/entity/resource-info.embeddable";
import { CommentRequest } from "@base-comment/types/request-types";
import { CommonTransactionService } from "@base-common/service/common-transaction.service";

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
      ipAddress: user.ipAddress,
    };

    if ("author" in userInfo && userInfo.author) {
      commentData.author = this.userAccountRepository.create({
        id: userInfo.author.id,
      });
    } else if ("guestAccount" in userInfo) {
      commentData.guestAccount = userInfo.guestAccount;
    }

    if (dto.parentId) {
      commentData.parent = this.commentRepository.create({ id: dto.parentId });
    }

    const manager = this.commonTransactionService.getManagerRepository<Comment>(
      Comment,
      this.commentRepository,
      qr
    );
    const result = await manager.save(commentData);
    await this.refreshCommentCount(dto.resourceInfo, "increment", qr);

    return result;
  }

  async getCommentsByResource(
    resourceType: ResourceType,
    resourceId: number
  ): Promise<Comment[]> {
    // return this.commentRepository.find({
    //   where: {
    //     resourceInfo: {
    //       resourceType,
    //       resourceId,
    //     },
    //     parent: IsNull(),
    //     status: CommentStatus.USE,
    //   },
    //   relations: ["author", "children", "children.author"],
    //   order: { createdAt: "ASC" },
    // });

    const result = await this.commentRepository
      .createQueryBuilder("comment")
      .leftJoinAndSelect("comment.author", "author")
      .leftJoinAndSelect("comment.children", "children")
      .leftJoinAndSelect("children.author", "childAuthor")
      .where("comment.resourceType = :resourceType", {
        resourceType,
      })
      .andWhere("comment.resourceId = :resourceId", {
        resourceId,
      })
      .andWhere("comment.parentId IS NULL")
      .andWhere(
        new Brackets((qb) => {
          /**
           * USE 상태이거나, 답글이 하나 이상 존재하는 경우
           * 답글이 존재하는 경우는 부모 댓글이 삭제 되어도 자식 댓글이 노출되어야 하기 때문
           * */
          qb.where("comment.status = :status", {
            status: CommentStatus.USE,
          }).orWhere("children.id IS NOT NULL");
        })
      )
      .orderBy("comment.createdAt", "ASC")
      .getMany();

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
    } else if ("guestAccount" in userInfo && user.type === "guest") {
      if (
        !comment.guestAccount?.guestAuthorPassword ||
        !user.guestAccount?.guestAuthorPassword
      ) {
        throw new ConflictException("비밀번호 정보가 확인되지 않습니다.");
      }

      const isPasswordValid = await bcrpyt.compare(
        user.guestAccount.guestAuthorPassword,
        comment.guestAccount.guestAuthorPassword
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
  async deleteComment(
    id: number,
    req: CommentRequest,
    qr?: QueryRunner
  ): Promise<UpdateResult> {
    const resourceInfo = req.comment.resourceInfo;
    const manager = this.commonTransactionService.getManagerRepository<Comment>(
      Comment,
      this.commentRepository,
      qr
    );
    const result = await manager.update(id, {
      status: CommentStatus.DELETED,
    });
    await this.refreshCommentCount(resourceInfo, "decrement", qr);
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
    resourceType: ResourceType,
    idList: number[]
  ) {
    const rawCounts = await this.commentRepository
      .createQueryBuilder("comment")
      .select("comment.resourceInfo.resourceId", "resourceId")
      .addSelect("COUNT(comment.id)", "count")
      .where("comment.resourceInfo.resourceType = :resourceType", {
        resourceType: resourceType,
      })
      .andWhere("comment.resourceInfo.resourceId IN (:...idList)", { idList })
      .andWhere("comment.status = :status", {
        status: CommentStatus.USE,
      })
      .groupBy("comment.resourceInfo.resourceId")
      .getRawMany();

    const commentCounts: Record<number, number> = rawCounts.reduce(
      (acc, row) => {
        acc[row.resourceId] = parseInt(row.count, 10);
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
    resourceType: ResourceType,
    resourceId: number,
    id?: number
  ) {
    const queryBuilder = this.commentRepository
      .createQueryBuilder("comment")
      .leftJoin(
        "like",
        "like",
        `like.resourceId = comment.id
        AND like.resourceType = :likeResourceType
        AND like.status = :likeStatus`,
        {
          likeResourceType: ResourceType.COMMENT,
          likeStatus: LikeStatus.SELECTED,
        }
      )
      .leftJoinAndSelect("comment.author", "userAccount")
      .leftJoinAndSelect("comment.children", "child_comment")
      .leftJoinAndSelect("child_comment.author", "child_author")
      .addSelect([
        `COUNT(CASE WHEN like.type = :likeType THEN 1 END) AS likeCount`,
        `COUNT(CASE WHEN like.type = :dislikeType THEN 1 END) AS dislikeCount`,
      ])
      .where("comment.status = :commentStatus", {
        commentStatus: CommentStatus.USE,
      })
      .andWhere("comment.resourceInfo.resourceId = :commentResourceId", {
        commentResourceId: resourceId,
      })
      .andWhere("comment.resourceInfo.resourceType = :commentResourceType", {
        commentResourceType: resourceType,
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
    resourceInfo: ResourceInfo,
    action: "increment" | "decrement",
    qr?: QueryRunner
  ): Promise<void> {
    const { resourceType, resourceId } = resourceInfo;

    const repository =
      this.resourceRepositoryService.getRepository(resourceType);

    if (!repository) {
      throw new ConflictException(
        `지원하지 않는 리소스 타입입니다: ${resourceType}`
      );
    }

    const targetEntity = repository.metadata.target as new () => any;

    if (qr) {
      const manager = qr.manager.getRepository(targetEntity);
      await manager[action]({ id: resourceId }, "commentCount", 1);
    } else {
      await repository[action]({ id: resourceId }, "commentCount", 1);
    }
  }
}
