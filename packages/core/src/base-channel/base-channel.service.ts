import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ChannelConfig } from "./entity/channel-config.entity";
import { Repository } from "typeorm";

@Injectable()
export class BaseChannelService {
  constructor(
    @InjectRepository(ChannelConfig)
    private readonly channelConfigRepository: Repository<ChannelConfig>
  ) {}

  async getChannelConfigById(id: number): Promise<ChannelConfig | null> {
    return this.channelConfigRepository.findOne({
      where: { id },
      relations: ["boards"],
    });
  }

  async getChannelStatusById(id: number): Promise<ChannelConfig | null> {
    return this.channelConfigRepository.findOne({
      where: { id },
      select: ["status"],
    });
  }

  async getChannelStatusByChannelName(
    channel: string
  ): Promise<ChannelConfig | null> {
    return this.channelConfigRepository.findOne({
      where: { channel },
      select: ["status"],
    });
  }
}
