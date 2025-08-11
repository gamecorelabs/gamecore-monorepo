import { BoardPostService, NewsPostService } from "@gamecorelabs/nestjs-core";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SearchService {
  constructor(
    private readonly boardPostService: BoardPostService,
    private readonly newsPostService: NewsPostService
  ) {}

  getSearch(search: string) {
    return {
      message: `Search results for: ${search}`,
      results: [], // Replace with actual search results
    };
  }
}
