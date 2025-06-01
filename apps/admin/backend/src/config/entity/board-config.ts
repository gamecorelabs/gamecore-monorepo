import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from '@_core/base-common/entity/base.entity';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { DomainConfig } from './domain-config';
import { BoardPost } from './board-post';

export enum BoardType {
  FREE = 'free', // 자유게시판
  GALLERY = 'gallery', // 갤러리
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
  @IsEnum(BoardType)
  @Column()
  type: BoardType; // 게시판 종류 (자유게시판, 기타 등등)

  @IsString()
  @Column({ type: 'varchar', length: 50 })
  title: string; // 바람의나라 자유게시판

  @IsString()
  @Column({ type: 'varchar', length: 255 })
  description?: string;

  @IsEnum(BoardStatus)
  @Column()
  @IsNumber()
  status: number;

  @ManyToOne(() => DomainConfig, (domain) => domain.boardConfigs)
  @JoinColumn({ name: 'domain_id' })
  domain: DomainConfig;

  @OneToMany(() => BoardPost, (BoardPost) => BoardPost.boardConfig)
  boardPosts: BoardPost[]; // 게시판에 속한 게시글들
}
