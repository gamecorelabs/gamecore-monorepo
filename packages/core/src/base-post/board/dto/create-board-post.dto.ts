import { PickType } from "@nestjs/mapped-types";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { BoardPost } from "../entity/board-post.entity";

export class CreateBoardPostDto extends PickType(BoardPost, [
  "title",
  "content",
  "boardConfig",
]) {
  @IsNumber()
  categoryId: number;
}

export class RequestCreateBoardPostDto extends PickType(CreateBoardPostDto, [
  "title",
  "content",
  "categoryId",
]) {}
