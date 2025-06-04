import { Module } from "@nestjs/common";
import { BaseDomainService } from "./base-common.service";

@Module({
  providers: [BaseDomainService],
  exports: [BaseDomainService],
})
export class BaseCommonModule {}
