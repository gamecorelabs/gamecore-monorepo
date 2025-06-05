import { Module } from "@nestjs/common";
import { BaseDomainService } from "./base-domain.service";

@Module({
  providers: [BaseDomainService],
  exports: [BaseDomainService],
})
export class BaseCommonModule {}
