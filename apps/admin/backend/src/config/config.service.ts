import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardConfig } from './entity/board-config';
import { Repository } from 'typeorm';
import { DomainConfig } from './entity/domain-config';
import { CreateDomainConfigDto } from './dto/create-domain-config.dto';

@Injectable()
export class ConfigService {
  constructor(
    @InjectRepository(DomainConfig)
    private readonly domainConfigRepository: Repository<DomainConfig>,
    @InjectRepository(BoardConfig)
    private readonly boardConfigRepository: Repository<BoardConfig>,
  ) {}

  async saveDomainConfig(dto: CreateDomainConfigDto) {
    const domain = this.domainConfigRepository.create({
      category: dto.category,
      domain: dto.domain,
      name: dto.name,
      status: dto.status,
    });

    return await this.domainConfigRepository.save(domain);
  }

  boardConfigList() {
    return {
      board: {
        name: 'Board Config',
        description: 'Configuration for the board module',
        version: '1.0.0',
        settings: {
          maxBoards: 10,
          allowGuestAccess: false,
          defaultBoardVisibility: 'public',
        },
      },
    };
  }

  saveBoardConfig() {
    // TODO: transaction

    // 실제 테이블 생성

    // 최종적으로 boardConfigRepository에 저장
    this.boardConfigRepository.save({});
  }
}
