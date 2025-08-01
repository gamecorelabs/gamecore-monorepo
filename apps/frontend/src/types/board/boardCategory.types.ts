import { BoardConfig } from "./boardConfig.types";

export type BoardCategory = {
  id: number;
  name: string;
  description: string;
  status: BoardCategoryStatus;
  createdAt: string;
  updatedAt: string;
  boardConfig?: BoardConfig;
};

export enum BoardCategoryStatus {
  INACTIVE = "0",
  ACTIVE = "1",
}

export const MappingBoardCategoryStatus = {
  [BoardCategoryStatus.INACTIVE]: "비활성화",
  [BoardCategoryStatus.ACTIVE]: "활성화",
};
