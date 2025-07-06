import { Module } from "@nestjs/common";
import { BaseCommonService } from "./base-common.service";

@Module({
  providers: [BaseCommonService],
  exports: [BaseCommonService],
})
export class BaseCommonModule {}
