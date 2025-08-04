import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Request,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import {
  CurrentUser,
  ResourceExistenceGuard,
  RequestNewsPostPaginationDto,
  CsrfTokenProtectionGuard,
  BaseNewsService,
  NewsPostService,
  UserTokenGuard,
  RequestCreateNewsPostDto,
} from "@gamecorelabs/nestjs-core";
import * as UserTypes from "@gamecorelabs/nestjs-core";
import * as RequestTypes from "@gamecorelabs/nestjs-core";
import { AnyFilesInterceptor } from "@nestjs/platform-express";

@Controller("news")
export class NewsController {
  constructor(
    private readonly baseNewsService: BaseNewsService,
    private readonly newsPostService: NewsPostService
  ) {}

  @Get(":id")
  @UseGuards(ResourceExistenceGuard)
  async getNewsById(
    @Request() req: RequestTypes.NewsConfigRequest,
    @Param("id", ParseIntPipe) newsId: number
  ) {
    return req.newsConfig;
  }

  @Get(":id/post")
  @UseGuards(ResourceExistenceGuard)
  async getNewsPost(
    @Request() req: RequestTypes.NewsConfigRequest,
    @Param("id", ParseIntPipe) newsId: number,
    @Query() query: RequestNewsPostPaginationDto
  ) {
    const { posts, paginationInfo } = await this.newsPostService.getPostList(
      newsId,
      query
    );

    return {
      posts,
      paginationInfo,
    };
  }

  // 해당 뉴스 페이지에 글쓰기
  @Post(":id/post")
  @UseGuards(CsrfTokenProtectionGuard, ResourceExistenceGuard, UserTokenGuard)
  @UseInterceptors(AnyFilesInterceptor()) // 파일 없어도 formData 파싱을 위해 필요
  postNewsPost(
    @Request() req: RequestTypes.NewsConfigRequest,
    @Param("id", ParseIntPipe) newsId: number,
    @CurrentUser() user: UserTypes.UserOrGuestLoginRequest,
    @Body() body: RequestCreateNewsPostDto
  ) {
    const dto = {
      newsConfig: req.newsConfig,
      ...body,
    };
    return this.newsPostService.savePost(dto, user);
  }
}
