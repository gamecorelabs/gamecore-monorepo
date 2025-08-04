import { Module } from "@nestjs/common";
import { BaseNewsService } from "./base-news.service";
import { BaseCommonModule } from "../base-common/base-common.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NewsConfig } from "./entity/news-config.entity";
import { NewsCategory } from "./entity/news-category.entity";
import { NewsExistsGuard } from "./guard/news-exists.guard";

@Module({
  imports: [
    TypeOrmModule.forFeature([NewsConfig, NewsCategory]),
    BaseCommonModule,
  ],
  exports: [BaseNewsService, NewsExistsGuard],
  providers: [BaseNewsService, NewsExistsGuard],
})
export class BaseNewsModule {}
