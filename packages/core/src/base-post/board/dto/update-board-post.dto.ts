import { PartialType, PickType } from "@nestjs/mapped-types";
import { BoardPost } from "../entity/board-post.entity";
import { IsNumber } from "class-validator";

export class UpdateBoardPostDto extends PartialType(
  PickType(BoardPost, ["title", "content"])
) {
  @IsNumber()
  categoryId: number;
}
