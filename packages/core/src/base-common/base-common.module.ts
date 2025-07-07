import { Module } from "@nestjs/common";
import { BaseCommonService } from "./base-common.service";
import { CommonPaginateService } from "./service/common-paginate.service";

@Module({
  providers: [BaseCommonService, CommonPaginateService],
  exports: [BaseCommonService, CommonPaginateService],
})
export class BaseCommonModule {}
