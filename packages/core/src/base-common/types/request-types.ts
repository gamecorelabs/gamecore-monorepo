import { Request } from "express";
import { ResourceInfo } from "../entity/resource-info.embeddable";

export type CommonRequest = Request & {
  resourceInfo: ResourceInfo;
};
