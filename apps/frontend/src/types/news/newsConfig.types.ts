import { NewsCategory } from "./newsCategory.types";

export type NewsConfig = {
  id: number;
  description: string;
  status: string;
  title: string;
  type: string;
  updatedAt: string;
  createdAt: string;
  categories: NewsCategory[];
};

export enum NewsStatus {
  INACTIVE = "0", // 비활성화
  ACTIVE = "1",
  MAINTENANCE = "2", // 유지보수 (관계자만 접속 가능)
  ARCHIVED = "3", // 보관됨 (관계자만 접속 가능)
}

export const MappingNewsStatus = {
  [NewsStatus.INACTIVE]: "비활성화",
  [NewsStatus.ACTIVE]: "활성화",
  [NewsStatus.MAINTENANCE]: "유지보수 중",
  [NewsStatus.ARCHIVED]: "보관됨",
};

export enum NewsType {
  GAME = "1", // 게임 관련 뉴스
  SALE = "2", // 할인 정보 관련 뉴스
  MEME = "3", // 밈 관련 뉴스
  ETC = "99", // 기타 뉴스
}

export const MappingNewsType = {
  [NewsType.GAME]: "게임 관련 뉴스",
  [NewsType.SALE]: "할인 정보 관련 뉴스",
  [NewsType.MEME]: "밈 관련 뉴스",
  [NewsType.ETC]: "기타 뉴스",
};
