import { PartialType, PickType } from "@nestjs/mapped-types";
import { BoardPost } from "../entity/board-post.entity";

export class UpdateBoardPostDto extends PartialType(
  PickType(BoardPost, ["title", "content"])
) {}
