import { Module } from "@nestjs/common";
import { NewsService } from "./news.service";
import { NewsController } from "./news.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import {
  NewsConfig,
  NewsPost,
  Comment,
  Like,
  NewsCategory,
} from "@gamecorelabs/nestjs-core";

@Module({
  controllers: [NewsController],
  providers: [NewsService],
  imports: [
    TypeOrmModule.forFeature([
      NewsConfig,
      NewsCategory,
      NewsPost,
      Comment,
      Like,
    ]),
  ],
})
export class NewsModule {}
