import { NewsConfig } from "./newsConfig.types";

export type NewsCategory = {
  id: number;
  title: string;
  description: string;
  status: NewsCategoryStatus;
  createdAt: string;
  updatedAt: string;
  newsConfig?: NewsConfig;
};

export enum NewsCategoryStatus {
  INACTIVE = "0",
  ACTIVE = "1",
}

export const MappingNewsCategoryStatus = {
  [NewsCategoryStatus.INACTIVE]: "비활성화",
  [NewsCategoryStatus.ACTIVE]: "활성화",
};
