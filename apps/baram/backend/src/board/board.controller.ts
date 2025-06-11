import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { BoardConfig } from "@_core/base-board/entity/board-config.entity";
import { BoardExistsPipe } from "@_core/base-board/pipe/board-exists.pipe";
import { BaseBoardService } from "@_core/base-board/base-board.service";

@Controller("board")
export class BoardController {
  constructor(private readonly baseBoardService: BaseBoardService) {}

  @Get()
  getBoards() {
    return this.baseBoardService.boardList();
  }

  @Get("/:id")
  getBoardById(@Param("id", ParseIntPipe, BoardExistsPipe) board: BoardConfig) {
    return board;
  }
}
