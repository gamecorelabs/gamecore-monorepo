import { UserAccount } from "../user/user.types";
import { NewsCategory } from "./newsCategory.types";
import { NewsConfig } from "./newsConfig.types";

export type NewsPost = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  ipAddress: string;
  status: string;
  thumbnail: string;
  viewCount: number;

  likeCount: number;
  dislikeCount: number;
  commentCount: number;

  author?: UserAccount;

  newsConfig: NewsConfig;
  category: NewsCategory;
};
