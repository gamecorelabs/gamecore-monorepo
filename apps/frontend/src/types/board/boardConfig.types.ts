import { Channel } from "@/types/channel/channel.types";
import { BoardCategory } from "./boardCategory.types";

export type BoardConfig = {
  id: number;
  description: string;
  status: string;
  title: string;
  type: string;
  updated_at: string;
  created_at: string;
  categories: BoardCategory[];
  channel?: Channel;
};

export enum BoardStatus {
  INACTIVE = "0", // 비활성화
  ACTIVE = "1",
  MAINTENANCE = "2", // 유지보수 (관계자만 접속 가능)
  ARCHIVED = "3", // 보관됨 (관계자만 접속 가능)
}

export const MappingBoardState = {
  [BoardStatus.INACTIVE]: "비활성화",
  [BoardStatus.ACTIVE]: "활성화",
  [BoardStatus.MAINTENANCE]: "유지보수 중",
  [BoardStatus.ARCHIVED]: "보관됨",
};

export enum BoardType {
  FREE = "basic", // 기본 스킨
  GALLERY = "gallery", // 갤러리 스킨
  ETC = "etc",
}

export const MappingBoardType = {
  [BoardType.FREE]: "기본 게시판 스킨",
  [BoardType.GALLERY]: "갤러리 스킨",
  [BoardType.ETC]: "기타",
};
