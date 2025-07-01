import { PickType } from "@nestjs/mapped-types";
import { IsOptional, IsNumber } from "class-validator";
import { Comment } from "../entity/comment.entity";
export class CreateCommentDto extends PickType(Comment, [
  "resource_info",
  "content",
]) {
  @IsOptional()
  @IsNumber()
  parent_id?: number;
}

export class RequestCreateCommentDto extends PickType(CreateCommentDto, [
  "content",
  "parent_id",
]) {}
