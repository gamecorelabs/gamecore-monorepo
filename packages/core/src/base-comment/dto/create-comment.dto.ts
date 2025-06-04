import { PickType } from "@nestjs/mapped-types";
import { Comment } from "../entity/base-comment-model.entity";

export class CreateCommentDto extends PickType(Comment, [
  "resource_type",
  "guest_author_id",
  "guest_author_password",
  "resource_sub_id",
  "resource_id",
  "content",
]) {}

export class BoardCreateCommentDto extends PickType(Comment, [
  "guest_author_id",
  "guest_author_password",
  "content",
]) {}
