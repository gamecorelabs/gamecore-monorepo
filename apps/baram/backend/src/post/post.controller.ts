import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from "@nestjs/common";
import { PostService } from "./post.service";
import { GuestOrUserTokenGuard } from "@_core/base-auth/guard/guest-or-user-token.guard";
import { CurrentUser } from "@_core/base-user/decorator/current-user.decorator";
import { RequestCreateBoardPostDto } from "@_core/base-post/board/dto/create-board-post.dto";
import { BoardExistsPipe } from "@_core/base-board/pipe/board-exists.pipe";
import { UserOrGuestLoginRequest } from "@_core/base-user/types/user.types";
import { BoardConfig } from "@_core/base-board/entity/board-config.entity";
import { BoardPostService } from "@_core/base-post/board/board-post.service";

@Controller("post")
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly boardPostService: BoardPostService
  ) {}

  // FIXME: Resource에 따라 API path 공용화 체크

  // 특정 게시판의 모든 포스트
  @Get("/board/:id")
  getBoardPost(@Param("id", ParseIntPipe, BoardExistsPipe) board: BoardConfig) {
    // TODO: pagination 적용
    return this.boardPostService.getPosts(board.id);
  }

  // 특정 게시판에 포스트 작성
  @Post("/board/:id")
  @UseGuards(GuestOrUserTokenGuard)
  postBoardPost(
    @CurrentUser() user: UserOrGuestLoginRequest,
    @Param("id", ParseIntPipe, BoardExistsPipe) boardConfig: BoardConfig,
    @Body() body: RequestCreateBoardPostDto
  ) {
    const dto = {
      boardConfig,
      ...body,
    };

    return this.boardPostService.savePost(dto, user);
  }
}
