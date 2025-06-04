import { Injectable } from "@nestjs/common";

@Injectable()
export class BaseBoardService {
  boardList() {
    return "List of boards";
  }
}
