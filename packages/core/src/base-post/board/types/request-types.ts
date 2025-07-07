import { CommonRequest } from "@_core/base-common/types/request-types";
import { BoardPost } from "@_core/base-post/board/entity/board-post.entity";

export type BoardPostRequest = CommonRequest & { boardPost: BoardPost };
