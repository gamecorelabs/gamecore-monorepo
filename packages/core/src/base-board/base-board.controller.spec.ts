import { Test, TestingModule } from "@nestjs/testing";
import { BaseBoardController } from "./board.controller";
import { BaseBoardService } from "./base-board.service";

describe("BaseBoardController", () => {
  let controller: BaseBoardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BaseBoardController],
      providers: [BaseBoardService],
    }).compile();

    controller = module.get<BaseBoardController>(BaseBoardController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
