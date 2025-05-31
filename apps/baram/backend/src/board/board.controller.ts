import { Controller, Get, Post } from "@nestjs/common";
import { BoardService } from "./board.service";
import { BaseBoardService } from "@_core/base-board/base-board.service";

@Controller("board")
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private readonly baseBoardService: BaseBoardService
  ) {}

  @Get()
  getBoards() {
    return this.baseBoardService.boardList();
  }

  @Post()
  postBoard() {
    return this.baseBoardService.saveBoard();
  }
}
