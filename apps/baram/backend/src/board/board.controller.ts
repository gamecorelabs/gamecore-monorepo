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
import { BaseBoardService } from "@_core/base-board/base-board.service";
import { BasePostService } from "@_core/base-post/base-post.service";
import { CreateBoardPostDto } from "@_core/base-post/board/dto/create-board-post.dto";
import { BoardConfig } from "@_core/base-board/entity/board-config.entity";

import { BoardCreateCommentDto } from "@_core/base-comment/dto/create-comment.dto";
import { ResourceType } from "@_core/base-comment/entity/base-comment-model.entity";
import { BaseCommentService } from "@_core/base-comment/base-comment.service";
import { BoardExistsPipe } from "@_core/base-board/pipe/board-exists.pipe";
import { PostInBoardGuard } from "@_core/base-post/board/guard/post-in-board.guard";
import { Request as ExpressRequest } from "express";
import { BoardPost } from "@_core/base-post/board/entity/board-post.entity";

interface BoardPostRequest extends ExpressRequest {
  boardPost: BoardPost;
}

@Controller("board")
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private readonly baseBoardService: BaseBoardService,
    private readonly basePostService: BasePostService,
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
    return this.basePostService.getPost(board.id);
  }

  @Post("/:id/post")
  postBoardPost(
    @Param("id", ParseIntPipe, BoardExistsPipe) board: BoardConfig,
    @Body() body: CreateBoardPostDto
  ) {
    return this.basePostService.savePost(board, body);
  }

  @Post("/:id/post/:post_id/comment")
  @UseGuards(PostInBoardGuard)
  postBoardComment(
    @Request() req: BoardPostRequest,
    @Param("id", ParseIntPipe, BoardExistsPipe) board: BoardConfig,
    @Param("post_id", ParseIntPipe) post_id: number,
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
