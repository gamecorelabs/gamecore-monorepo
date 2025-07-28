import { PickType } from "@nestjs/mapped-types";
import { ChannelConfig } from "@base-channel/entity/channel-config.entity";

export class CreateChannelConfigDto extends PickType(ChannelConfig, [
  "category",
  "channel",
  "title",
  "status",
]) {}
