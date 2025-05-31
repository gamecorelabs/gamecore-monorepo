import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseModel } from '@_core/base-common/entity/base.entity';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { DomainConfig } from './domain-config';

export enum BoardType {
  FREE = 'free', // 자유게시판
  ETC = 'etc',
}

export enum BoardStatus {
  INACTIVE = 0, // 비활성화
  ACTIVE = 1,
  MAINTENANCE = 2, // 유지보수 (관계자만 접속 가능)
  ARCHIVED = 3, // 보관됨 (관계자만 접속 가능)
}

@Entity()
export class BoardConfig extends BaseModel {
  @IsString()
  @Column({ type: 'varchar', length: 200, unique: true })
  table_name: string;

  @IsEnum(BoardType)
  @Column()
  type: BoardType;

  @IsString()
  @Column({ type: 'varchar', length: 50 })
  board_name: string;

  @IsString()
  @Column({ type: 'varchar', length: 255 })
  description: string;

  @IsEnum(BoardStatus)
  @Column()
  @IsNumber()
  status: number;

  @ManyToOne(() => DomainConfig, (domain) => domain.boardConfigs)
  domain: DomainConfig;
}
