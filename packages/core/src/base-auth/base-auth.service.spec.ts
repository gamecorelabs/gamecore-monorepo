import { Test, TestingModule } from "@nestjs/testing";
import { BaseAuthService } from "./base-auth.service";

describe("BaseAuthService", () => {
  let service: BaseAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BaseAuthService],
    }).compile();

    service = module.get<BaseAuthService>(BaseAuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
