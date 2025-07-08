import { ResourceInfo } from "../common/resource.types";
import { UserAccount, GuestAccount } from "../user/user.types";

export type Comment = {
  id: number;
  content: string;
  status: string;
  created_at: string;
  updated_at: string;
  resource_info: ResourceInfo;
  author?: UserAccount;
  guest_account?: GuestAccount;
  ip_address: string;
  like_count: number;
  dislike_count: number;
  children?: Comment[];
};

export enum CommentStatus {
  DELETED = "0",
  USE = "1",
  HOLD = "2",
  ADMIN_DELETED = "99",
}
