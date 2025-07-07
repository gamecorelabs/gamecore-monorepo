import { CommonRequest } from "@_core/base-common/types/resource-types";
import { Comment } from "../entity/comment.entity";

export type CommentRequest = CommonRequest & { comment: Comment };
