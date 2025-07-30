import { Module } from "@nestjs/common";
import { BaseBoardService } from "./base-board.service";
import { BaseCommonModule } from "../base-common/base-common.module";
import { ChannelConfig } from "@base-channel/entity/channel-config.entity";
import { BoardConfig } from "./entity/board-config.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardExistsGuard } from "./guard/board-exists.guard";
import { BoardCategory } from "./entity/board-category.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([ChannelConfig, BoardConfig, BoardCategory]),
    BaseCommonModule,
  ],
  exports: [BaseBoardService, BoardExistsGuard],
  providers: [BaseBoardService, BoardExistsGuard],
})
export class BaseBoardModule {}
