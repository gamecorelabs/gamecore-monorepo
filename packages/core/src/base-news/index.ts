// Module
export { BaseNewsModule } from "./base-news.module";

// Service
export { BaseNewsService } from "./base-news.service";

// DTOs
export { CreateNewsConfigDto } from "./dto/create-news-config.dto";

// Entities
export { NewsCategory } from "./entity/news-category.entity";
export { NewsConfig } from "./entity/news-config.entity";

// Enums
export * from "./enum/news-category.enum";
export * from "./enum/news-config.enum";

// Guards
export { NewsExistsGuard } from "./guard/news-exists.guard";

// Pipes
export { NewsExistsPipe } from "./pipe/news-exists.pipe";

// Types
export * from "./types/request-types";
