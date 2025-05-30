import { Controller, Get } from "@nestjs/common";
import { BoardService } from "./board.service";
import { BaseBoardService } from "@_core/board/board.service";

@Controller("board")
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private readonly baseBoardService: BaseBoardService
  ) {}

  @Get(":id/posts")
  getBoard() {
    return this.baseBoardService.getBoardPosts(100);
  }
}
