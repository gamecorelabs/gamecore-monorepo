import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseModel } from '@_core/base-common/entity/base.entity';
import { IsBoolean, IsEnum, IsString } from 'class-validator';
import { DomainConfig } from './domain-config';

export enum BoardType {
  FREE = 'free', // 자유게시판
  ETC = 'etc',
}

@Entity()
export class BoardConfig extends BaseModel {
  @IsString()
  @Column({ type: 'varchar', length: 200, unique: true })
  table_name: string;

  @IsEnum(BoardType)
  @Column()
  board_type: BoardType;

  /**
   * 게시판 이름
   */
  @IsString()
  @Column({ type: 'varchar', length: 50 })
  board_name: string;

  @IsString()
  @Column({ type: 'varchar', length: 255 })
  description: string;

  @IsBoolean()
  @Column({ type: 'boolean', default: false })
  is_public?: boolean = false;

  @ManyToOne(() => DomainConfig, (domain) => domain.boardConfigs)
  domain: DomainConfig;
}
