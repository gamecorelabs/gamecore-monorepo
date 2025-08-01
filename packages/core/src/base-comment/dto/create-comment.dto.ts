import { PickType } from "@nestjs/mapped-types";
import { IsOptional, IsNumber } from "class-validator";
import { Comment } from "../entity/comment.entity";
export class CreateCommentDto extends PickType(Comment, [
  "resourceInfo",
  "content",
]) {
  @IsOptional()
  @IsNumber()
  parentId?: number;
}

export class RequestCreateCommentDto extends PickType(CreateCommentDto, [
  "content",
  "parentId",
]) {}
