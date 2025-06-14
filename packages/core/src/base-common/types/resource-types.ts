import { Request } from "express";
import { BoardPost } from "@_core/base-post/board/entity/board-post.entity";
import { ResourceInfo } from "../entity/resource-info.embeddable";
import { BoardConfig } from "@_core/base-board/entity/board-config.entity";

export type CommonRequest = Request & {
  resource_info: ResourceInfo;
};

export type BoardConfigRequest = CommonRequest & { boardConfig: BoardConfig };

export type BoardPostRequest = CommonRequest & { boardPost: BoardPost };
