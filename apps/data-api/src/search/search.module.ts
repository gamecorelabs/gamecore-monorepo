import { Module } from "@nestjs/common";
import { SearchService } from "./search.service";
import { SearchController } from "./search.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import {
  BoardCategory,
  BoardConfig,
  BoardPost,
  Comment,
  Like,
  NewsCategory,
  NewsConfig,
  NewsPost,
} from "@gamecorelabs/nestjs-core";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BoardConfig,
      BoardCategory,
      BoardPost,
      NewsConfig,
      NewsCategory,
      NewsPost,
      Comment,
      Like,
    ]),
  ],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
