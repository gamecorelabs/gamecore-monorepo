import { CommonRequest } from "@base-common/types/request-types";
import { Comment } from "../entity/comment.entity";

export type CommentRequest = CommonRequest & { comment: Comment };
