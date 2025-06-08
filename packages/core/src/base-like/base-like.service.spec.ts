import { Test, TestingModule } from '@nestjs/testing';
import { BaseLikeService } from './base-like.service';

describe('BaseLikeService', () => {
  let service: BaseLikeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BaseLikeService],
    }).compile();

    service = module.get<BaseLikeService>(BaseLikeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
