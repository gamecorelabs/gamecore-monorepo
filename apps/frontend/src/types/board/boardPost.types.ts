import { UserAccount, GuestAccount } from "../user/user.types";
import { BoardCategory } from "./boardCategory.types";
import { BoardConfig } from "./boardConfig.types";

export type BoardPost = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  ip_address: string;
  status: string;
  view_count: number;

  like_count: number;
  dislike_count: number;
  comment_count: number;

  boardConfig: BoardConfig;
  author?: UserAccount;
  guest_account?: GuestAccount;

  category?: BoardCategory;
};
