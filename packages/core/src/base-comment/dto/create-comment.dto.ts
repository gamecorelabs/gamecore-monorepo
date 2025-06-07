import { PickType } from "@nestjs/mapped-types";
import { Comment } from "../entity/comment.entity";

export class CreateCommentDto extends PickType(Comment, [
  "resource_type",
  "resource_sub_id",
  "resource_id",
  "content",
]) {}

export class RequestCreateCommentDto extends PickType(CreateCommentDto, [
  "content",
]) {}
