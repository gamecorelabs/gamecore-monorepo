import { Module } from "@nestjs/common";
import { BaseBoardService } from "./base-board.service";
import { BaseBoardController } from "./base-board.controller";
import { BaseCommonModule } from "../base-common/base-common.module";

@Module({
  controllers: [BaseBoardController],
  exports: [BaseBoardService],
  providers: [BaseBoardService],
  imports: [BaseCommonModule],
})
export class BaseBoardModule {}
