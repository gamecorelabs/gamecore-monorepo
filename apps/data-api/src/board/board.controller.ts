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
  BaseBoardService,
  CurrentUser,
  BoardPostService,
  GuestOrUserTokenGuard,
  RequestCreateBoardPostDto,
  ResourceExistenceGuard,
  BoardPostPaginationDto,
} from "@gamecorelabs/nestjs-core";
import * as UserTypes from "@gamecorelabs/nestjs-core";
import * as RequestTypes from "@gamecorelabs/nestjs-core";
import { AnyFilesInterceptor } from "@nestjs/platform-express";

@Controller("board")
export class BoardController {
  constructor(
    private readonly baseBoardService: BaseBoardService,
    private readonly boardPostService: BoardPostService
  ) {}

  @Get()
  getBoards() {
    // return this.baseBoardService.boardList();
  }

  @Get(":id")
  @UseGuards(ResourceExistenceGuard)
  async getBoardById(
    @Request() req: RequestTypes.BoardConfigRequest,
    @Param("id", ParseIntPipe) boardId: number
  ) {
    return req.boardConfig;
  }

  @Get(":id/post")
  @UseGuards(ResourceExistenceGuard)
  async getBoardPost(
    @Request() req: RequestTypes.BoardConfigRequest,
    @Param("id", ParseIntPipe) boardId: number,
    @Query() query: BoardPostPaginationDto
  ) {
    const { posts, paginationInfo } = await this.boardPostService.getPostList(
      boardId,
      query
    );

    return {
      posts,
      paginationInfo,
    };
  }

  // 해당 게시판에 글쓰기
  @Post(":id/post")
  @UseGuards(ResourceExistenceGuard)
  @UseGuards(GuestOrUserTokenGuard)
  @UseInterceptors(AnyFilesInterceptor()) // 파일 없어도 formData 파싱을 위해 필요
  postBoardPost(
    @Request() req: RequestTypes.BoardConfigRequest,
    @Param("id", ParseIntPipe) boardId: number,
    @CurrentUser() user: UserTypes.UserOrGuestLoginRequest,
    @Body() body: RequestCreateBoardPostDto
  ) {
    const dto = {
      boardConfig: req.boardConfig,
      ...body,
    };
    return this.boardPostService.savePost(dto, user);
  }
}
