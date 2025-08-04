import { PickType } from "@nestjs/mapped-types";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { NewsPost } from "../entity/news-post.entity";

export class CreateNewsPostDto extends PickType(NewsPost, [
  "title",
  "content",
  "newsConfig",
]) {
  @IsNumber()
  categoryId: number;
}

export class RequestCreateNewsPostDto extends PickType(CreateNewsPostDto, [
  "title",
  "content",
  "categoryId",
]) {}
