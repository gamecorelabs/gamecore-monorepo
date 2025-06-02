import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from "@nestjs/common";
import { BoardService } from "./board.service";
import { BaseBoardService } from "@_core/base-board/base-board.service";
import { BasePostService } from "@_core/base-post/base-post.service";
import { CreateBoardPostDto } from "@_core/base-post/dto/create-board-post.dto";
import { CreateBoardCommentDto } from "@_core/base-comment/dto/create-board-comment.dto";
import { BaseCommentService } from "@_core/base-comment/base-comment.service";

@Controller("board")
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private readonly baseBoardService: BaseBoardService,
    private readonly basePostService: BasePostService,
    private readonly baseCommentService: BaseCommentService // Assuming you have a BaseCommentService for comments
  ) {}

  @Get()
  getBoards() {
    return this.baseBoardService.boardList();
  }

  // FIXME: nested 하게 처리할지 고민
  @Post("/:id/post")
  postBoardPost(
    @Param("id", ParseIntPipe) board_id: number,
    @Body() body: CreateBoardPostDto
  ) {
    return this.basePostService.savePost(board_id, body);
  }

  // FIXME: nested 하게 처리할지 고민
  @Post("/:id/post/:post_id/comment")
  postBoardComment(
    @Param("id", ParseIntPipe) board_id: number,
    @Param("post_id", ParseIntPipe) post_id: number,
    @Body() body: CreateBoardCommentDto
  ) {
    return this.baseCommentService.saveComment(board_id, post_id, body);
  }
}
