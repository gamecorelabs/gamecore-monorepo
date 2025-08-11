import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BoardPost } from "@base-post/board/entity/board-post.entity";
import { CreateBoardPostDto } from "@base-post/board/dto/create-board-post.dto";
import { FindManyOptions, Repository, UpdateResult } from "typeorm";
import { PostUtilService } from "../util/post-util.service";
import { BoardPostStatus } from "./enum/board-post.enum";
import { UserOrGuestLoginRequest } from "@base-user/types/user.types";
import * as bcrpyt from "bcrypt";
import { ConfigService } from "@nestjs/config";
import { ENV_HASH_ROUNDS } from "@base-common/const/env-keys.const";
import { getUserInfo } from "@base-user/util/get-user-info.util";
import { UpdateBoardPostDto } from "./dto/update-board-post.dto";
import { ResourceType } from "@base-common/enum/common.enum";
import { LikeStatus, LikeType } from "@base-like/enum/like.enum";
import { BaseLikeService } from "@base-like/base-like.service";
import { BaseCommentService } from "@base-comment/base-comment.service";
import {
  BoardPostPaginationDto,
  RequestBoardPostPaginationDto,
} from "./dto/board-post-pagination.dto";
import { CommonPaginationService } from "@base-common/service/common-pagination.service";

@Injectable()
export class BoardPostService {
  constructor(
    @InjectRepository(BoardPost)
    private readonly boardPostRepository: Repository<BoardPost>,
    private readonly configService: ConfigService,
    private readonly commonPaginationService: CommonPaginationService
  ) {}

  async getPostList(boardId: number, dto: BoardPostPaginationDto) {
    const result = await this.getPostsPaginate(dto, boardId);
    const { data: posts, paginationInfo } = result;

    return { posts, paginationInfo };
  }

  async getPostDetail(postId: number) {
    return await this.getPostById(postId);
  }

  async savePost(dto: CreateBoardPostDto, user: UserOrGuestLoginRequest) {
    const userInfo = await getUserInfo(
      user,
      parseInt(this.configService.get<string>(ENV_HASH_ROUNDS) as string)
    );
    const boardPost = this.boardPostRepository.create({
      category: { id: dto.categoryId },
      ipAddress: user.ipAddress,
      ...userInfo,
      ...dto,
    });
    try {
      return await this.boardPostRepository.save(boardPost);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async checkOwnerPost(
    id: number,
    user: UserOrGuestLoginRequest
  ): Promise<boolean> {
    const userInfo = await getUserInfo(
      user,
      parseInt(this.configService.get<string>(ENV_HASH_ROUNDS) as string)
    );

    const post = await this.boardPostRepository.findOne({
      where: { id, status: BoardPostStatus.USE },
      relations: ["author"],
    });

    if (!post) {
      throw new ConflictException("존재하지 않은 게시글 입니다.");
    }

    if ("author" in userInfo && post.author) {
      if (post.author.id !== userInfo.author.id) {
        throw new ConflictException("게시글 작성자가 아닙니다.");
      }
      return true;
    } else if ("guestAccount" in userInfo && user.type === "guest") {
      if (
        !post.guestAccount?.guestAuthorPassword ||
        !user.guestAccount?.guestAuthorPassword
      ) {
        throw new ConflictException("비밀번호 정보가 확인되지 않습니다.");
      }

      const isPasswordValid = await bcrpyt.compare(
        user.guestAccount.guestAuthorPassword,
        post.guestAccount.guestAuthorPassword
      );

      if (!isPasswordValid) {
        throw new ConflictException("비밀번호가 일치하지 않습니다.");
      }
      return true;
    } else {
      throw new ConflictException("계정 정보가 올바르지 않습니다.");
    }
  }

  async updatePost(id: number, dto: UpdateBoardPostDto) {
    const post = await this.boardPostRepository.findOne({
      where: { id, status: BoardPostStatus.USE },
    });

    if (!post) {
      throw new ConflictException("게시글이 존재하지 않습니다.");
    }

    Object.assign(post, {
      category: { id: dto.categoryId },
      ...dto,
    });

    try {
      return await this.boardPostRepository.save(post);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // 댓글 삭제 (soft-delete)
  async deletePost(id: number): Promise<boolean> {
    const result = await this.boardPostRepository.update(id, {
      status: BoardPostStatus.DELETED,
    });

    if (result.affected === 0) {
      throw new InternalServerErrorException("게시글 삭제에 실패했습니다.");
    }

    return true;
  }

  async getPostById(id: number) {
    const post = await this.boardPostRepository.findOne({
      where: { id, status: BoardPostStatus.USE },
      relations: [
        "author",
        "category",
        "boardConfig",
        "boardConfig.categories",
      ],
    });

    if (!post) {
      throw new ConflictException("존재하지 않은 게시글 입니다.");
    }

    return post;
  }

  async getPostsPaginate(dto: RequestBoardPostPaginationDto, boardId?: number) {
    const conditions: FindManyOptions<BoardPost> = {
      where: {
        status: BoardPostStatus.USE,
        ...(boardId && { boardConfig: { id: boardId } }),
        ...(dto.where__categoryId && {
          category: { id: dto.where__categoryId },
        }),
      },
      relations: ["author", "boardConfig", "category"],
    };

    if (dto.where__categoryId) {
      delete dto.where__categoryId;
    }

    return this.commonPaginationService.pagePaginate(
      dto,
      this.boardPostRepository,
      {
        ...conditions,
      }
    );
  }

  /**
   * @deprecated
   */
  async getPostWithLikeCount(id?: number) {
    const queryBuilder = this.boardPostRepository
      .createQueryBuilder("boardPost")
      .leftJoin(
        "like",
        "like",
        `like.resourceId = boardPost.id
          AND like.resourceType = :likeResourceType
          AND like.status = :likeStatus`,
        {
          likeResourceType: ResourceType.BOARD_POST,
          likeStatus: LikeStatus.SELECTED,
        }
      )
      .addSelect([
        `COUNT(CASE WHEN like.type = :likeType THEN 1 END) AS likeCount`,
        `COUNT(CASE WHEN like.type = :dislikeType THEN 1 END) AS dislikeCount`,
      ])
      .where("boardPost.status = :boardPostStatus", {
        boardPostStatus: BoardPostStatus.USE,
      })
      .groupBy("boardPost.id")
      .setParameters({
        likeType: LikeType.LIKE,
        dislikeType: LikeType.DISLIKE,
      });

    if (id) {
      queryBuilder.andWhere("boardPost.id = :id", { id });
    }

    const result = await queryBuilder.getRawAndEntities();
    return result;
  }

  private mergePostData(
    posts: BoardPost | BoardPost[],
    likeCounts: Record<number, { likeCount: number; dislikeCount: number }>,
    commentCounts: Record<number, number>,
    totalPost?: number
  ) {
    const postsArray = Array.isArray(posts) ? posts : [posts];

    const result = postsArray.map((post) => {
      const likeData = likeCounts[post.id] || { likeCount: 0, dislikeCount: 0 };
      const postCommentCount = commentCounts[post.id] || 0;

      return {
        ...post,
        likeCount: likeData.likeCount,
        dislikeCount: likeData.dislikeCount,
        commentCount: postCommentCount,
        totalPost: totalPost || 0,
      };
    });

    return Array.isArray(posts) ? result : result[0];
  }
}
