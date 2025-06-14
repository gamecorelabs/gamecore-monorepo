import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { BoardConfig } from "@_core/base-board/entity/board-config.entity";
import { BoardExistsPipe } from "@_core/base-board/pipe/board-exists.pipe";
import { BaseBoardService } from "@_core/base-board/base-board.service";
import { CurrentUser } from "@_core/base-user/decorator/current-user.decorator";
import { BoardPostService } from "@_core/base-post/board/board-post.service";
import { GuestOrUserTokenGuard } from "@_core/base-auth/guard/guest-or-user-token.guard";
import { UserOrGuestLoginRequest } from "@_core/base-user/types/user.types";
import { RequestCreateBoardPostDto } from "@_core/base-post/board/dto/create-board-post.dto";
import { ResourceExistenceGuard } from "@_core/base-common/guard/resource-existence.guard";
import { BoardConfigRequest } from "@_core/base-common/types/resource-types";

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

  @Get("/:id")
  @UseGuards(ResourceExistenceGuard)
  async getBoardById(
    @Request() req: BoardConfigRequest,
    @Param("id", ParseIntPipe) boardId: number
  ) {
    return req.boardConfig;
  }

  @Get("/:id/post")
  @UseGuards(ResourceExistenceGuard)
  getBoardPost(
    @Request() req: BoardConfigRequest,
    @Param("id", ParseIntPipe) boardId: number
    // @Param("board_id", ParseIntPipe) board_id: number
  ) {
    return this.boardPostService.getPosts(boardId);
  }

  // 해당 게시판에 글쓰기
  @Post("/:id/post")
  @UseGuards(GuestOrUserTokenGuard)
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
