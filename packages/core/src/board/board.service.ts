import { Injectable } from "@nestjs/common";

@Injectable()
export class BaseBoardService {
  getBoardPosts(boardId: number) {
    return { message: `Posts for board with ID: ${boardId}` };
  }
}
