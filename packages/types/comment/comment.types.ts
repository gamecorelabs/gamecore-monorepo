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
  likeCount: number;
  dislikeCount: number;
  children?: Comment[];
};
