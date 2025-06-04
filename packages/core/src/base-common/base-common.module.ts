import { Module } from "@nestjs/common";
import { BaseCommonService } from "./base-common.service";

@Module({
  providers: [BaseCommonService],
})
export class BaseCommonModule {}
