import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseModel } from "@_core/base-common/entity/base.entity";
import { IsEnum, IsNumber, IsString } from "class-validator";
import { DomainConfig } from "@_core/base-domain/entity/domain-config.entity";
import { BoardPost } from "@_core/base-post/board/entity/board-post.entity";
import { BoardType, BoardStatus } from "../enum/board-config.enum";

@Entity()
export class BoardConfig extends BaseModel {
  @IsString()
  @Column({ type: "varchar", length: 50 })
  title: string; // 바람의나라 자유게시판

  @IsString()
  @Column({ type: "varchar", length: 255 })
  description?: string;

  @IsEnum(BoardType)
  @Column({ type: "varchar", length: 20 })
  type: BoardType; // 게시판 종류 (자유게시판, 기타 등등)

  @IsEnum(BoardStatus)
  @Column({ type: "int", default: BoardStatus.ACTIVE })
  status: number;

  @ManyToOne(() => DomainConfig, (domain) => domain.boardConfigs)
  @JoinColumn({ name: "domain_id" })
  domain: DomainConfig;

  @OneToMany(() => BoardPost, (BoardPost) => BoardPost.boardConfig)
  boardPosts: BoardPost[]; // 게시판에 속한 게시글들
}
