import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { SearchService } from "./search.service";
import {
  BaseSearchService,
  SearchSecurityGuard,
} from "@gamecorelabs/nestjs-core";

@Controller("search")
export class SearchController {
  constructor(
    private readonly searchService: SearchService,
    private readonly baseSearchService: BaseSearchService
  ) {}

  @Get(":search")
  @UseGuards(SearchSecurityGuard)
  async getSearch(@Param("search") search: string) {
    return this.baseSearchService.getSearch(search);
  }
}
