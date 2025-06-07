import { PickType } from "@nestjs/mapped-types";
import { Comment } from "../entity/comment.entity";

export class UpdateCommentDto extends PickType(Comment, ["content"]) {}
