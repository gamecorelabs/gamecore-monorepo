import { PickType } from "@nestjs/mapped-types";
import { BaseCommentModel } from "../entity/base-comment-model.entity";

export class CreateCommentDto extends PickType(BaseCommentModel, [
  "resource_type",
  "guest_author_id",
  "guest_author_password",
  "resource_sub_id",
  "resource_id",
  "content",
]) {}
