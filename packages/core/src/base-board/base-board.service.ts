import { Injectable } from "@nestjs/common";

@Injectable()
export class BaseBoardService {
  boardList() {
    return [
      { id: 1, name: "General Discussion" },
      { id: 2, name: "Announcements" },
      { id: 3, name: "Feedback" },
    ];
  }

  saveBoard() {
    return { message: "Board saved successfully!" };
  }
}
