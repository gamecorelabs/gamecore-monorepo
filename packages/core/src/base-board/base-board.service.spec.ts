import { Test, TestingModule } from "@nestjs/testing";
import { BaseBoardService } from "./base-board.service";

describe("BaseBoardService", () => {
  let service: BaseBoardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BaseBoardService],
    }).compile();

    service = module.get<BaseBoardService>(BaseBoardService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
