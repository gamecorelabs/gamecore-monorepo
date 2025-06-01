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

@Controller("board")
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private readonly baseBoardService: BaseBoardService,
    private readonly basePostService: BasePostService
  ) {}

  @Get()
  getBoards() {
    return this.baseBoardService.boardList();
  }

  @Post("/:id/post")
  postBoardPost(
    @Param("id", ParseIntPipe) board_id: number,
    @Body() body: CreateBoardPostDto
  ) {
    return this.basePostService.savePost(board_id, body);
  }
}
