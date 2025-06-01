import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardConfig } from '@_core/base-board/entity/board-config';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { DomainConfig } from '@_core/base-common/entity/domain-config';
import { CreateDomainConfigDto } from '@_core/base-board/dto/create-domain-config.dto';
import { CreateBoardConfigDto } from '@_core/base-board/dto/create-board-config.dto';

@Injectable()
export class ConfigService {
  constructor(
    @InjectRepository(DomainConfig)
    private readonly domainConfigRepository: Repository<DomainConfig>,
    @InjectRepository(BoardConfig)
    private readonly boardConfigRepository: Repository<BoardConfig>,
    private readonly dataSource: DataSource,
  ) {}

  async saveDomainConfig(dto: CreateDomainConfigDto) {
    const domain = this.domainConfigRepository.create({
      category: dto.category,
      domain: dto.domain,
      title: dto.title,
      status: dto.status,
    });

    return await this.domainConfigRepository.save(domain);
  }

  async saveBoardConfig(domain_id: number, dto: CreateBoardConfigDto) {
    const domain = await this.domainConfigRepository.findOne({
      where: { id: domain_id },
    });

    if (!domain) {
      throw new ConflictException(
        '해당 도메인이 존재하지 않으므로 게시판을 생성할 수 없습니다.',
      );
    }

    const boardConfig = this.boardConfigRepository.create({
      type: dto.type,
      title: dto.title,
      description: dto.description,
      status: dto.status,
      domain: domain,
    });

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
