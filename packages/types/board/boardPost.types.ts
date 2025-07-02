import { UserAccount, GuestAccount } from "../user/user.types";

export type BoardPost = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  ip_address: string;
  status: string;
  view_count: number;

  likeCount: number;
  dislikeCount: number;
  commentCount: number;

  author?: UserAccount;
  guest_account?: GuestAccount;
};
