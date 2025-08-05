import { Test, TestingModule } from "@nestjs/testing";
import { BaseNewsService } from "./base-news.service";

describe("BaseNewsService", () => {
  let service: BaseNewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BaseNewsService],
    }).compile();

    service = module.get<BaseNewsService>(BaseNewsService);
  });

  it("should be defined2", () => {
    expect(service).toBeDefined();
  });
});
