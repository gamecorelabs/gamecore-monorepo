// News Post
export { NewsPostService } from "./news-post.service";

// News Post DTOs
export {
  NewsPostPaginationDto,
  RequestNewsPostPaginationDto,
} from "./dto/news-post-pagination.dto";
export {
  CreateNewsPostDto,
  RequestCreateNewsPostDto,
} from "./dto/create-news-post.dto";
export { UpdateNewsPostDto } from "./dto/update-news-post.dto";

// Board Post Entities
export { NewsPost } from "./entity/news-post.entity";

// Board Post Enums
export * from "./enum/news-post.enum";

// News Post Guards
export { PostInNewsGuard } from "./guard/post-in-news.guard";

// News Post Types
export * from "./types/request-types";
