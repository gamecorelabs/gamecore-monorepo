import { Test, TestingModule } from '@nestjs/testing';
import { BaseChannelService } from './base-channel.service';

describe('BaseChannelService', () => {
  let service: BaseChannelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BaseChannelService],
    }).compile();

    service = module.get<BaseChannelService>(BaseChannelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
