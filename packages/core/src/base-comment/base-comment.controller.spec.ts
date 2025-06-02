import { Test, TestingModule } from '@nestjs/testing';
import { BaseCommentController } from './base-comment.controller';
import { BaseCommentService } from './base-comment.service';

describe('BaseCommentController', () => {
  let controller: BaseCommentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BaseCommentController],
      providers: [BaseCommentService],
    }).compile();

    controller = module.get<BaseCommentController>(BaseCommentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
