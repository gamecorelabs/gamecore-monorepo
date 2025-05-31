import { Test, TestingModule } from "@nestjs/testing";
import { BasePostService } from "./base-post.service";

describe("BasePostService", () => {
  let service: BasePostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BasePostService],
    }).compile();

    service = module.get<BasePostService>(BasePostService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
