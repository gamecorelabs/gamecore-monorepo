import { Controller, Get, Post } from "@nestjs/common";
import { BaseBoardService } from "./base-board.service";

@Controller("board")
export class BaseBoardController {
  constructor(private readonly baseBoardService: BaseBoardService) {}

  // 모든 게시판 리스트 조회
  @Get()
  getBoards() {
    return this.baseBoardService.boardList();
  }

  @Post()
  postBoard() {
    return this.baseBoardService.saveBoard();
  }
}
