// Module
export { BaseCommentModule } from './base-comment.module';

// Service
export { BaseCommentService } from './base-comment.service';

// DTOs
export { CreateCommentDto, RequestCreateCommentDto } from './dto/create-comment.dto';
export { UpdateCommentDto } from './dto/update-comment.dto';

// Entities
export { Comment } from './entity/comment.entity';

// Enums
export * from './enum/comment.enum';

// Guards
export { CommentInPostGuard } from './guard/comment-in-post.guard';

// Types
export * from './types/request-types';