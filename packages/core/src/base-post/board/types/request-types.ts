import { CommonRequest } from "@gamecoregg/nestjs-core/base-common/types/request-types";
import { BoardPost } from "@gamecoregg/nestjs-core/base-post/board/entity/board-post.entity";

export type BoardPostRequest = CommonRequest & { boardPost: BoardPost };
