import { BoardComment } from "../entity/board-comment.entity";
import { PickType } from "@nestjs/mapped-types";

export class CreateBoardCommentDto extends PickType(BoardComment, [
  "guest_author_id",
  "guest_author_password",
  "content",
]) {}
