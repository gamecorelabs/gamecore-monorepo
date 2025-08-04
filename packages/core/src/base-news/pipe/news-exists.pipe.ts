import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NewsConfig } from "../entity/news-config.entity";
import { Repository } from "typeorm";

@Injectable()
export class NewsExistsPipe implements PipeTransform {
  constructor(
    @InjectRepository(NewsConfig)
    private readonly newsConfigRepository: Repository<NewsConfig>
  ) {}

  async transform(value: number, metadata: ArgumentMetadata) {
    if (!value) {
      throw new NotFoundException("뉴스 번호를 찾을 수 없습니다.");
    }

    return await this.newsConfigRepository
      .findOne({
        where: { id: value },
      })
      .then((news) => {
        if (!news) {
          throw new NotFoundException(`뉴스 정보를 찾을 수 없습니다.`);
        }
        return news;
      });
  }
}
