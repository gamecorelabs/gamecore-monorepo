import { PickType } from "@nestjs/mapped-types";
import { Comment } from "../entity/comment.entity";

export class CreateCommentDto extends PickType(Comment, [
  "resource_info",
  "content",
]) {}

export class RequestCreateCommentDto extends PickType(CreateCommentDto, [
  "content",
]) {}
