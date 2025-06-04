import { Test, TestingModule } from "@nestjs/testing";
import { BaseCommonService } from "./base-common.service";

describe("BaseCommonService", () => {
  let service: BaseCommonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BaseCommonService],
    }).compile();

    service = module.get<BaseCommonService>(BaseCommonService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
