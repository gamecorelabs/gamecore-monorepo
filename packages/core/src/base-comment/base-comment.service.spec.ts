import { Test, TestingModule } from '@nestjs/testing';
import { BaseCommentService } from './base-comment.service';

describe('BaseCommentService', () => {
  let service: BaseCommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BaseCommentService],
    }).compile();

    service = module.get<BaseCommentService>(BaseCommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
