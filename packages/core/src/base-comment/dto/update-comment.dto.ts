import { PickType } from "@nestjs/mapped-types";
import { Comment } from "../entity/base-comment-model.entity";

export class UpdateCommentDto extends PickType(Comment, ["content"]) {}
