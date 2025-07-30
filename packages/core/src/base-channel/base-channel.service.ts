import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ChannelConfig } from "./entity/channel-config.entity";
import { Repository } from "typeorm";
import { CreateChannelConfigDto } from "./dto/create-channel-config.dto";

@Injectable()
export class BaseChannelService {
  constructor(
    @InjectRepository(ChannelConfig)
    private readonly channelConfigRepository: Repository<ChannelConfig>
  ) {}

  async getChannelConfig() {
    try {
      return await this.channelConfigRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(
        "채널 설정을 불러오는 중 오류가 발생했습니다."
      );
    }
  }

  async saveChannelConfig(dto: CreateChannelConfigDto) {
    const channel = this.channelConfigRepository.create({
      category: dto.category,
      channel: dto.channel,
      title: dto.title,
      status: dto.status,
    });

    return await this.channelConfigRepository.save(channel);
  }

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
