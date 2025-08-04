import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NewsConfig } from "./entity/news-config.entity";
import { QueryRunner, Repository } from "typeorm";
import { CommonTransactionService } from "@base-common/service/common-transaction.service";
import { NewsCategory } from "./entity/news-category.entity";
import { NewsStatus } from "./enum/news-config.enum";
import { NewsCategoryStatus } from "./enum/news-category.enum";
import { CreateNewsConfigDto } from "./dto/create-news-config.dto";

@Injectable()
export class BaseNewsService {
  constructor(
    @InjectRepository(NewsConfig)
    private readonly newsConfigRepository: Repository<NewsConfig>,
    @InjectRepository(NewsCategory)
    private readonly newsCategoryRepository: Repository<NewsCategory>,
    private readonly commonTransactionService: CommonTransactionService
  ) {}

  async getNewsConfig() {
    try {
      return await this.newsConfigRepository.find({
        where: { status: NewsStatus.ACTIVE },
        relations: ["categories"],
      });
    } catch (error) {
      throw new InternalServerErrorException(
        "뉴스 설정을 불러오는 중 오류가 발생했습니다."
      );
    }
  }

  async saveNewsConfig(dto: CreateNewsConfigDto, qr?: QueryRunner) {
    const newsConfig = this.newsConfigRepository.create(dto);

    try {
      const manager =
        this.commonTransactionService.getManagerRepository<NewsConfig>(
          NewsConfig,
          this.newsConfigRepository,
          qr
        );
      const result = await manager.save(newsConfig);

      // 카테고리 배열을 한번에 저장
      const categoryManager =
        this.commonTransactionService.getManagerRepository<NewsCategory>(
          NewsCategory,
          this.newsCategoryRepository,
          qr
        );

      const categories = [
        {
          title: "잡담",
          order: 1,
          status: NewsCategoryStatus.ACTIVE,
          newsConfig: { id: result.id },
        },
        {
          title: "질문",
          order: 2,
          status: NewsCategoryStatus.ACTIVE,
          newsConfig: { id: result.id },
        },
        {
          title: "기타",
          order: 3,
          status: NewsCategoryStatus.ACTIVE,
          newsConfig: { id: result.id },
        },
      ].map((data) => this.newsCategoryRepository.create(data));

      await categoryManager.save(categories);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
