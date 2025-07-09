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
import { BaseBoardService } from "@_core/base-board/base-board.service";
import { CurrentUser } from "@_core/base-user/decorator/current-user.decorator";
import { BoardPostService } from "@_core/base-post/board/board-post.service";
import { GuestOrUserTokenGuard } from "@_core/base-auth/guard/guest-or-user-token.guard";
import { UserOrGuestLoginRequest } from "@_core/base-user/types/user.types";
import { RequestCreateBoardPostDto } from "@_core/base-post/board/dto/create-board-post.dto";
import { ResourceExistenceGuard } from "@_core/base-common/guard/resource-existence.guard";
import { BoardConfigRequest } from "@_core/base-board/types/request-types";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import { BoardPostPaginationDto } from "@_core/base-post/board/const/board-post-pagination.dto";

@Controller("board")
export class BoardController {
  constructor(
    private readonly baseBoardService: BaseBoardService,
    private readonly boardPostService: BoardPostService
  ) {}

  @Get()
  getBoards() {
    return this.baseBoardService.boardList();
  }

  @Get(":id")
  @UseGuards(ResourceExistenceGuard)
  async getBoardById(
    @Request() req: BoardConfigRequest,
    @Param("id", ParseIntPipe) boardId: number
  ) {
    return req.boardConfig;
  }

  @Get(":id/post")
  @UseGuards(ResourceExistenceGuard)
  async getBoardPost(
    @Request() req: BoardConfigRequest,
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
    @Request() req: BoardConfigRequest,
    @Param("id", ParseIntPipe) boardId: number,
    @CurrentUser() user: UserOrGuestLoginRequest,
    @Body() body: RequestCreateBoardPostDto
  ) {
    const dto = {
      boardConfig: req.boardConfig,
      ...body,
    };

    return this.boardPostService.savePost(dto, user);
  }
}
