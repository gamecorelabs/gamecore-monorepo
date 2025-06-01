import { BaseModel } from '@_core/base-common/entity/base.entity';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { BoardConfig } from './board-config';

export enum DomainCategory {
  GAME = 'game',
  HOBBY = 'hobby',
  COMMUNITY = 'community',
  EDUCATION = 'education',
  ETC = 'etc',
}

export enum DomainStatus {
  TERMINATED = 0, // 서비스 종료 (비활성화)
  ACTIVE = 1, // 활성화 (서비스 중)
  MAINTENANCE = 2, // 유지보수 단계 (관계자만 접속 가능)
  ARCHIVED = 3, // 보관됨 (관계자만 접속 가능)
}

@Entity()
export class DomainConfig extends BaseModel {
  @Column()
  @IsEnum(DomainCategory)
  @IsString()
  category: DomainCategory;

  @IsString()
  @Column({ type: 'varchar', length: 50, unique: true })
  domain: string; // ex) diablo4, baram

  @IsString()
  @Column({ type: 'varchar', length: 100 })
  title: string; // ex) 디아블로4, 바람의나라

  @IsEnum(DomainStatus)
  @Column()
  @IsNumber()
  status: number;

  @OneToMany(() => BoardConfig, (boardConfig) => boardConfig.domain)
  boardConfigs: BoardConfig[];
}
