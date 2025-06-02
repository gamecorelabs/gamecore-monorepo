import { Injectable } from "@nestjs/common";

@Injectable()
export class BaseBoardService {
  boardList() {}

  saveBoard() {
    return { message: "Board saved successfully!" };
  }
}
