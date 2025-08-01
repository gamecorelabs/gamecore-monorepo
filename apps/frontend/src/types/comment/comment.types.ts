import { ResourceInfo } from "../common/resource.types";
import { UserAccount, GuestAccount } from "../user/user.types";

export type Comment = {
  id: number;
  content: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  resourceInfo: ResourceInfo;
  author?: UserAccount;
  guestAccount?: GuestAccount;
  ipAddress: string;
  likeCount: number;
  dislikeCount: number;
  children?: Comment[];
};

export enum CommentStatus {
  DELETED = "0",
  USE = "1",
  HOLD = "2",
  ADMIN_DELETED = "99",
}
