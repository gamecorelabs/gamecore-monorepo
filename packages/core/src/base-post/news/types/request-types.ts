import { CommonRequest } from "@base-common/types/request-types";
import { NewsPost } from "@base-post/news/entity/news-post.entity";

export type NewsPostRequest = CommonRequest & { newsPost: NewsPost };
