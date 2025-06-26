import { UserAccount, GuestAccount } from "../user/user.types";

export type BoardPost = {
  id: number;
  title: string;
  content: string;
  comment_count: number;
  created_at: string;
  updated_at: string;
  ip_address: string;
  like_count: number;
  status: string;
  view_count: number;

  author?: UserAccount;
  guest_account?: GuestAccount;
};
