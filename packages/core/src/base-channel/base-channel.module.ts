import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseChannelService } from "./base-channel.service";
import { ChannelConfig } from "./entity/channel-config.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ChannelConfig])],
  providers: [BaseChannelService],
  exports: [BaseChannelService],
})
export class BaseChannelModule {}
