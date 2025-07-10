import { CommonRequest } from "@base-common/types/request-types";
import { BoardPost } from "@base-post/board/entity/board-post.entity";

export type BoardPostRequest = CommonRequest & { boardPost: BoardPost };
