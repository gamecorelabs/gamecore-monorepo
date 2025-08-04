import { PartialType, PickType } from "@nestjs/mapped-types";
import { NewsPost } from "../entity/news-post.entity";
import { IsNumber } from "class-validator";

export class UpdateNewsPostDto extends PartialType(
  PickType(NewsPost, ["title", "content"])
) {
  @IsNumber()
  categoryId: number;
}
