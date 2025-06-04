import { PickType } from "@nestjs/mapped-types";
import { BoardPost } from "../entity/board-post.entity";

export class CreateBoardPostDto extends PickType(BoardPost, [
  "guest_author_id",
  "guest_author_password",
  "title",
  "content",
]) {}
