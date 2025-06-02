import { Controller } from '@nestjs/common';
import { BaseCommentService } from './base-comment.service';

@Controller('base-comment')
export class BaseCommentController {
  constructor(private readonly baseCommentService: BaseCommentService) {}
}
