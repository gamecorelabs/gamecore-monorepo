import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, Repository } from "typeorm";
import { PostUtilService } from "../util/post-util.service";
import { UserOrGuestLoginRequest } from "@base-user/types/user.types";
import { ConfigService } from "@nestjs/config";
import { ENV_HASH_ROUNDS } from "@base-common/const/env-keys.const";
import { getUserInfo } from "@base-user/util/get-user-info.util";
import { UpdateNewsPostDto } from "./dto/update-news-post.dto";
import { CommonPaginationService } from "@base-common/service/common-pagination.service";
import { NewsPostStatus } from "./enum/news-post.enum";
import { NewsPost } from "./entity/news-post.entity";
import {
  NewsPostPaginationDto,
  RequestNewsPostPaginationDto,
} from "./dto/news-post-pagination.dto";
import { CreateNewsPostDto } from "./dto/create-news-post.dto";

@Injectable()
export class NewsPostService {
  constructor(
    @InjectRepository(NewsPost)
    private readonly newsPostRepository: Repository<NewsPost>,
    private readonly configService: ConfigService,
    private readonly commonPaginationService: CommonPaginationService,
    private readonly postUtilService: PostUtilService
  ) {}

  async getPostList(newsId: number, dto: NewsPostPaginationDto) {
    const result = await this.getPostsPaginate(dto, newsId);
    const { data: posts, paginationInfo } = result;

    return { posts, paginationInfo };
  }

  async getPostDetail(postId: number) {
    return await this.getPostById(postId);
  }

  async savePost(dto: CreateNewsPostDto, user: UserOrGuestLoginRequest) {
    const userInfo = await getUserInfo(
      user,
      parseInt(this.configService.get<string>(ENV_HASH_ROUNDS) as string)
    );

    const thumbnail = this.postUtilService.extractFirstImage(dto.content);

    const saveData = {
      ...dto,
      ...(thumbnail && {
        thumbnail,
      }),
    };

    const newsPost = this.newsPostRepository.create({
      category: { id: dto.categoryId },
      ipAddress: user.ipAddress,
      ...userInfo,
      ...saveData,
    });
    try {
      return await this.newsPostRepository.save(newsPost);
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

    const post = await this.newsPostRepository.findOne({
      where: { id, status: NewsPostStatus.USE },
      relations: ["author"],
    });

    if (!post) {
      throw new ConflictException("존재하지 않은 뉴스 입니다.");
    }

    if ("author" in userInfo && post.author) {
      if (post.author.id !== userInfo.author.id) {
        throw new ConflictException("뉴스 작성자가 아닙니다.");
      }
      return true;
    } else {
      throw new ConflictException("계정 정보가 올바르지 않습니다.");
    }
  }

  async updatePost(id: number, dto: UpdateNewsPostDto) {
    const post = await this.newsPostRepository.findOne({
      where: { id, status: NewsPostStatus.USE },
    });

    if (!post) {
      throw new ConflictException("뉴스이 존재하지 않습니다.");
    }

    let thumbnail: string | null = null;
    if (dto.content) {
      thumbnail = this.postUtilService.extractFirstImage(dto.content);
    }

    const saveData = {
      ...dto,
      ...(thumbnail && {
        thumbnail,
      }),
    };

    Object.assign(post, {
      category: { id: dto.categoryId },
      ...saveData,
    });

    try {
      return await this.newsPostRepository.save(post);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // 댓글 삭제 (soft-delete)
  async deletePost(id: number): Promise<boolean> {
    const result = await this.newsPostRepository.update(id, {
      status: NewsPostStatus.DELETED,
    });

    if (result.affected === 0) {
      throw new InternalServerErrorException("뉴스 삭제에 실패했습니다.");
    }

    return true;
  }

  async getPostById(id: number) {
    const post = await this.newsPostRepository.findOne({
      where: { id, status: NewsPostStatus.USE },
      relations: ["author", "category", "newsConfig", "newsConfig.categories"],
    });

    if (!post) {
      throw new ConflictException("존재하지 않은 뉴스 입니다.");
    }

    return post;
  }

  async getPostsPaginate(dto: RequestNewsPostPaginationDto, newsId?: number) {
    const conditions: FindManyOptions<NewsPost> = {
      where: {
        status: NewsPostStatus.USE,
        ...(newsId && { newsConfig: { id: newsId } }),
        ...(dto.where__categoryId && {
          category: { id: dto.where__categoryId },
        }),
      },
      relations: ["author", "newsConfig", "category"],
    };

    if (dto.where__categoryId) {
      delete dto.where__categoryId;
    }

    return this.commonPaginationService.pagePaginate(
      dto,
      this.newsPostRepository,
      {
        ...conditions,
      }
    );
  }
}
