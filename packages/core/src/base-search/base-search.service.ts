import { BoardPostService } from "@base-post/board/board-post.service";
import { NewsPostService } from "@base-post/news/news-post.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BaseSearchService {
  constructor(
    private readonly boardPostService: BoardPostService,
    private readonly newsPostService: NewsPostService
  ) {}

  async getSearch(search: string) {
    let dto = {
      where__title__like: search,
      or_where__content__like: search,
      take: 10,
    };

    const boardPosts = await this.boardPostService.getPostsPaginate(dto);
    const newsPosts = await this.newsPostService.getPostsPaginate(dto);

    return { boardResults: boardPosts.data, newsResults: newsPosts.data };
  }
}
