import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BoardPost } from "@_core/base-post/board/entity/board-post.entity";
import { CreateBoardPostDto } from "@_core/base-post/board/dto/create-board-post.dto";
import { FindManyOptions, Repository, UpdateResult } from "typeorm";
import { PostUtilService } from "../util/post-util.service";
import { BoardPostStatus } from "./enum/board-post.enum";
import { UserOrGuestLoginRequest } from "@_core/base-user/types/user.types";
import * as bcrpyt from "bcrypt";
import { ConfigService } from "@nestjs/config";
import { ENV_HASH_ROUNDS } from "@_core/base-common/const/env-keys.const";
import { getUserInfo } from "@_core/base-user/util/get-user-info.util";
import { UpdateBoardPostDto } from "./dto/update-board-post.dto";
import { ResourceType } from "@_core/base-common/enum/common.enum";
import { LikeStatus, LikeType } from "@_core/base-like/enum/like.enum";
import { BaseLikeService } from "@_core/base-like/base-like.service";
import { BaseCommentService } from "@_core/base-comment/base-comment.service";

@Injectable()
export class BoardPostService {
  constructor(
    @InjectRepository(BoardPost)
    private readonly boardPostRepository: Repository<BoardPost>,
    private readonly postUtilService: PostUtilService,
    private readonly configService: ConfigService,
    private readonly baseLikeService: BaseLikeService,
    private readonly baseCommentService: BaseCommentService
  ) {}

  async getPostList(boardId: number) {
    const posts = await this.getPosts(boardId);
    const postIdList = posts.map((post) => post.id);

    const likeCounts = await this.baseLikeService.getLikeCountByResourceInId(
      ResourceType.BOARD_POST,
      postIdList
    );

    const commentCounts =
      await this.baseCommentService.getCommentCountByResourceInId(
        ResourceType.BOARD_POST,
        postIdList
      );

    return this.mergePostData(posts, likeCounts, commentCounts);
  }

  async getPosts(board_id: number) {
    // FIXME: pagination 반영
    const conditions: FindManyOptions<BoardPost> = {
      where: {
        status: BoardPostStatus.USE,
        boardConfig: { id: board_id },
      },
      relations: ["author"],
      order: { created_at: "DESC" },
    };

    return await this.boardPostRepository.find(conditions);
  }

  async getPostById(id: number) {
    const post = await this.boardPostRepository.findOne({
      where: { id, status: BoardPostStatus.USE },
      relations: ["author"],
    });

    if (!post) {
      throw new ConflictException("존재하지 않은 게시글 입니다.");
    }

    return post;
  }

  async getPostWithLikeCount(id?: number) {
    const queryBuilder = this.boardPostRepository
      .createQueryBuilder("board_post")
      .leftJoin(
        "like",
        "like",
        `like.resource_id = board_post.id
          AND like.resource_type = :likeResourceType
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
      .where("board_post.status = :boardPostStatus", {
        boardPostStatus: BoardPostStatus.USE,
      })
      .groupBy("board_post.id")
      .setParameters({
        likeType: LikeType.LIKE,
        dislikeType: LikeType.DISLIKE,
      });

    if (id) {
      queryBuilder.andWhere("board_post.id = :id", { id });
    }

    const result = await queryBuilder.getRawAndEntities();
    return result;
  }

  async savePost(dto: CreateBoardPostDto, user: UserOrGuestLoginRequest) {
    console.log("savePost dto", dto);
    console.log("savePost user", user);

    const userInfo = await getUserInfo(
      user,
      parseInt(this.configService.get<string>(ENV_HASH_ROUNDS) as string)
    );

    const boardPost = this.boardPostRepository.create({
      ...dto,
      ...userInfo,
      ip_address: user.ip_address,
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
    } else if ("guest_account" in userInfo && user.type === "guest") {
      const isPasswordValid = await bcrpyt.compare(
        user.guest_account.guest_author_password,
        post.guest_account.guest_author_password
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

    Object.assign(post, dto);

    try {
      return await this.boardPostRepository.save(post);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // 댓글 삭제 (soft-delete)
  async deletePost(id: number): Promise<UpdateResult> {
    return await this.boardPostRepository.update(id, {
      status: BoardPostStatus.DELETED,
    });
  }

  private mergePostData(
    posts: BoardPost[],
    likeCounts: Record<number, { likeCount: number; dislikeCount: number }>,
    commentCounts: Record<number, number>
  ) {
    return posts.map((post) => {
      const likeData = likeCounts[post.id] || { likeCount: 0, dislikeCount: 0 };
      const postCommentCount = commentCounts[post.id] || 0;

      return {
        ...post,
        likeCount: likeData.likeCount,
        dislikeCount: likeData.dislikeCount,
        commentCount: postCommentCount,
      };
    });
  }
}
