import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardConfig } from '@gamecorelabs/nestjs-core/base-board/entity/board-config.entity';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { ChannelConfig } from '@gamecorelabs/nestjs-core/base-channel/entity/channel-config.entity';
import { CreateChannelConfigDto } from '@gamecorelabs/nestjs-core/base-channel/dto/create-channel-config.dto';
import { CreateBoardConfigDto } from '@gamecorelabs/nestjs-core/base-board/dto/create-board-config.dto';

@Injectable()
export class ConfigService {
  constructor(
    @InjectRepository(ChannelConfig)
    private readonly channelConfigRepository: Repository<ChannelConfig>,
    @InjectRepository(BoardConfig)
    private readonly boardConfigRepository: Repository<BoardConfig>,
    private readonly dataSource: DataSource,
  ) {}

  async getChannelConfig() {
    try {
      return await this.channelConfigRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(
        '채널 설정을 불러오는 중 오류가 발생했습니다.',
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

  async saveBoardConfig(channel_id: number, dto: CreateBoardConfigDto) {
    const channel = await this.channelConfigRepository.findOne({
      where: { id: channel_id },
    });

    if (!channel) {
      throw new ConflictException(
        '해당 채널이 존재하지 않으므로 게시판을 생성할 수 없습니다.',
      );
    }

    const boardConfig = this.boardConfigRepository.create(dto);
    boardConfig.channel = channel;

    try {
      return await this.boardConfigRepository.save(boardConfig);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // async saveBoardConfig(domain_id: number, dto: CreateBoardConfigDto) {
  //   // TODO: transaction
  //   const qr = this.dataSource.createQueryRunner();
  //   await qr.connect();
  //   await qr.startTransaction();
  //   try {
  //     qr.manager.save(BoardConfig, dto);

  //     await qr.commitTransaction();
  //   } catch (error) {
  //     await qr.rollbackTransaction();
  //     throw new InternalServerErrorException(error.message);
  //   } finally {
  //     qr.release();
  //   }
  // }
}
