import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseModel } from "@gamecoregg/nestjs-core/base-common/entity/base.entity";
import { IsEnum, IsNumber, IsString } from "class-validator";
import { DomainConfig } from "@gamecoregg/nestjs-core/base-domain/entity/domain-config.entity";
import { BoardPost } from "@gamecoregg/nestjs-core/base-post/board/entity/board-post.entity";
import { BoardType, BoardStatus } from "../enum/board-config.enum";
import { BoardCategory } from "@gamecoregg/nestjs-core/base-board/entity/board-category.entity";

@Entity()
export class BoardConfig extends BaseModel {
  @IsString()
  @Column({ type: "varchar", length: 100 })
  title: string; // 바람의나라 자유게시판

  @IsString()
  @Column({ type: "varchar", length: 255 })
  description?: string;

  @IsEnum(BoardType)
  @Column({ type: "enum", enum: BoardType })
  type: BoardType; // 게시판 형태 (기본, 갤러리 등등)

  @IsEnum(BoardStatus)
  @Column({ type: "enum", enum: BoardStatus, default: BoardStatus.ACTIVE })
  status: BoardStatus;

  @ManyToOne(() => DomainConfig, (domain) => domain.boardConfigs)
  @JoinColumn({ name: "domain_id" })
  domain: DomainConfig;

  @OneToMany(() => BoardPost, (BoardPost) => BoardPost.boardConfig)
  boardPosts: BoardPost[]; // 게시판에 속한 게시글들

  @OneToMany(() => BoardCategory, (category) => category.boardConfig, {
    cascade: true,
  })
  categories: BoardCategory[];
}
