import { Module } from "@nestjs/common";
import { BaseChannelService } from "./base-channel.service";

@Module({
  providers: [BaseChannelService],
  exports: [BaseChannelService],
})
export class BaseChannelModule {}
