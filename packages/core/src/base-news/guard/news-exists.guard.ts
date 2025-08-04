import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { NewsConfig } from "../entity/news-config.entity";
import { NewsStatus } from "../enum/news-config.enum";

@Injectable()
export class NewsExistsGuard implements CanActivate {
  constructor(
    @InjectRepository(NewsConfig)
    private readonly newsConfigRepository: Repository<NewsConfig>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const newsId = request.params.id;

    if (!newsId) {
      throw new BadRequestException("알 수 없는 뉴스 번호입니다.");
    }

    // 게시판에 속한 게시물인지 확인
    const newsConfig = await this.newsConfigRepository.findOne({
      where: {
        id: newsId,
      },
      relations: ["categories"],
    });

    if (!newsConfig) {
      throw new NotFoundException(`존재하지 않는 뉴스 페이지 입니다.`);
    }

    if (newsConfig.status !== NewsStatus.ACTIVE) {
      throw new NotFoundException(`더이상 이용할 수 없는 뉴스 페이지 입니다.`);
    }

    request.newsConfig = newsConfig;
    return true;
  }
}
