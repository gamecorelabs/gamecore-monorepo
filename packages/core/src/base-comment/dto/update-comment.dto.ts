import { PickType } from "@nestjs/mapped-types";
import { BaseCommentModel } from "../entity/base-comment-model.entity";

export class UpdateCommentDto extends PickType(BaseCommentModel, ["content"]) {}
