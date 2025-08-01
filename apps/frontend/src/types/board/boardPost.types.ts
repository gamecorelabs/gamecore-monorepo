import { UserAccount, GuestAccount } from "../user/user.types";
import { BoardCategory } from "./boardCategory.types";
import { BoardConfig } from "./boardConfig.types";

export type BoardPost = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  ipAddress: string;
  status: string;
  viewCount: number;

  likeCount: number;
  dislikeCount: number;
  commentCount: number;

  boardConfig: BoardConfig;
  author?: UserAccount;
  guestAccount?: GuestAccount;

  category: BoardCategory;
};
