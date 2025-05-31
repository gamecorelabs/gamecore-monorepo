import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardConfig } from './entity/board-config';
import { Repository } from 'typeorm';

@Injectable()
export class ConfigService {
  constructor(
    @InjectRepository(BoardConfig)
    private readonly boardConfigRepository: Repository<BoardConfig>,
  ) {}

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
    // FIXME: transaction

    // 실제 테이블 생성

    // 최종적으로 boardConfigRepository에 저장
    this.boardConfigRepository.save({});
  }
}
