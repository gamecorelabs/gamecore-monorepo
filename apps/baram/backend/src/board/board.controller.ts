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
import { BoardService } from "./board.service";
import { CreateBoardPostDto } from "@_core/base-post/board/dto/create-board-post.dto";
import { BoardConfig } from "@_core/base-board/entity/board-config.entity";

import { BoardCreateCommentDto } from "@_core/base-comment/dto/create-comment.dto";
import { BaseCommentService } from "@_core/base-comment/base-comment.service";
import { BoardExistsPipe } from "@_core/base-board/pipe/board-exists.pipe";
import { PostInBoardGuard } from "@_core/base-post/board/guard/post-in-board.guard";
import { Request as ExpressRequest } from "express";
import { BoardPost } from "@_core/base-post/board/entity/board-post.entity";

import { BaseBoardService } from "@_core/base-board/base-board.service";
import { BoardPostService } from "@_core/base-post/board/board-post.service";
import { ResourceType } from "@_core/base-comment/enum/comment.enum";

import { GuestOrUserTokenGuard } from "@_core/base-auth/guard/guest-or-user-token.guard";

import { CurrentUser } from "@_core/base-user/decorator/current-user.decorator";

import { UserOrGuestLoginRequest } from "@_core/base-user/types/user.types";

interface BoardPostRequest extends ExpressRequest {
  boardPost: BoardPost;
}

@Controller("board")
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private readonly baseBoardService: BaseBoardService,
    private readonly boardPostService: BoardPostService,
    private readonly baseCommentService: BaseCommentService
  ) {}

  // FIXME: nested 하게 처리할지 고민

  @Get()
  getBoards() {
    return this.baseBoardService.boardList();
  }

  @Get("/:id")
  getBoardById(@Param("id", ParseIntPipe, BoardExistsPipe) board: BoardConfig) {
    return board;
  }

  @Get("/:id/post")
  getBoardPost(@Param("id", ParseIntPipe, BoardExistsPipe) board: BoardConfig) {
    // TODO: pagination 적용
    return this.boardPostService.getPosts(board.id);
  }

  @Post("/:id/post")
  @UseGuards(GuestOrUserTokenGuard)
  postBoardPost(
    @CurrentUser() user: UserOrGuestLoginRequest,
    @Param("id", ParseIntPipe, BoardExistsPipe) board: BoardConfig,
    @Body() body: CreateBoardPostDto
  ) {
    return this.boardPostService.savePost(board.id, user, body);
  }

  @Post("/:id/post/:post_id/comment")
  @UseGuards(PostInBoardGuard)
  postBoardComment(
    @Request() req: BoardPostRequest,
    @Param("id", ParseIntPipe, BoardExistsPipe) board: BoardConfig,
    @Param("post_id", ParseIntPipe) post_id: number,
    @CurrentUser() user: UserOrGuestLoginRequest,
    @Body() body: BoardCreateCommentDto
  ) {
    const dto = {
      resource_type: ResourceType.BOARD,
      resource_id: req.boardPost.boardConfig.id,
      resource_sub_id: req.boardPost.id,
      ...body,
    };

    return this.baseCommentService.saveComment(dto);
  }
}
