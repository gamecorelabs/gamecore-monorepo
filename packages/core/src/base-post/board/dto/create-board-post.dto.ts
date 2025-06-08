import { PickType } from "@nestjs/mapped-types";
import { BoardPost } from "../entity/board-post.entity";

export class CreateBoardPostDto extends PickType(BoardPost, [
  "title",
  "content",
  "boardConfig",
]) {}

export class RequestCreateBoardPostDto extends PickType(CreateBoardPostDto, [
  "title",
  "content",
]) {}
