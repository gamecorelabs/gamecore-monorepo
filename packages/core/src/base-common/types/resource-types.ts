import { Request } from "express";
import { BoardPost } from "@_core/base-post/board/entity/board-post.entity";
import { ResourceInfo } from "../entity/resource-info.embeddable";

export type CommonRequest = Request & {
  resource_info: ResourceInfo;
};

export type BoardPostRequest = CommonRequest & { boardPost: BoardPost };
