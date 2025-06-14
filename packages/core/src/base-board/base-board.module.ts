import { Module } from "@nestjs/common";
import { BaseBoardService } from "./base-board.service";
import { BaseCommonModule } from "../base-common/base-common.module";
import { BoardConfig } from "./entity/board-config.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardExistsGuard } from "./guard/board-exists.guard";

@Module({
  imports: [TypeOrmModule.forFeature([BoardConfig]), BaseCommonModule],
  exports: [BaseBoardService, BoardExistsGuard],
  providers: [BaseBoardService, BoardExistsGuard],
})
export class BaseBoardModule {}
