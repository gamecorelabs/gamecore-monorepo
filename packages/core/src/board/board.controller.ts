import { Controller } from "@nestjs/common";
import { BaseBoardService } from "./board.service";

@Controller("board")
export class BaseBoardController {
  constructor(private readonly boardService: BaseBoardService) {}
}
