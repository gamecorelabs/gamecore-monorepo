import { Test, TestingModule } from "@nestjs/testing";
import { BaseCommonController } from "./base-common.controller";
import { BaseCommonService } from "./base-common.service";

describe("CommonController", () => {
  let controller: BaseCommonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BaseCommonController],
      providers: [BaseCommonService],
    }).compile();

    controller = module.get<BaseCommonController>(BaseCommonController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
