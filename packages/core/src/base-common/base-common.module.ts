import { Module } from "@nestjs/common";
import { BaseCommonService } from "./base-common.service";
import { BaseCommonController } from "./base-common.controller";

@Module({
  controllers: [BaseCommonController],
  providers: [BaseCommonService],
})
export class BaseCommonModule {}
