import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { NewsPostStatus } from "../enum/news-post.enum";
import { NewsPost } from "../entity/news-post.entity";
import { NewsStatus } from "@base-news/enum/news-config.enum";

@Injectable()
export class PostInNewsGuard implements CanActivate {
  constructor(
    @InjectRepository(NewsPost)
    private readonly newsPostRepository: Repository<NewsPost>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const newsId = request.params.id;

    if (!newsId) {
      throw new BadRequestException("존재하지 않은 뉴스입니다.");
    }

    // 뉴스 대분류에 속한 뉴스인지 확인
    const news = await this.newsPostRepository.findOne({
      where: {
        id: newsId,
      },
      relations: ["newsConfig"], // 뉴스 정보도 함께 가져오기
    });

    if (!news || news.status !== NewsPostStatus.USE) {
      throw new NotFoundException(`삭제되었거나 존재하지 않는 뉴스 입니다.`);
    }

    if (news.newsConfig.status !== NewsStatus.ACTIVE) {
      throw new NotFoundException(`더이상 이용할 수 없는 뉴스 페이지입니다.`);
    }

    request.newsPost = news;

    return true;
  }
}
