import { IsEnum, IsNumber, IsString } from "class-validator";
import { Column, Entity, JoinColumn, OneToMany } from "typeorm";
import { BaseModel } from "@_core/base-common/entity/base.entity";
import { BoardConfig } from "@_core/base-board/entity/board-config.entity";
import {
  DomainCategory,
  DomainStatus,
} from "@_core/base-domain/enum/domain.enum";

@Entity()
export class DomainConfig extends BaseModel {
  @IsEnum(DomainCategory)
  @Column({ type: "enum", enum: DomainCategory })
  category: DomainCategory;

  @IsString()
  @Column({ type: "varchar", length: 50, unique: true })
  domain: string; // ex) diablo4, baram

  @IsString()
  @Column({ type: "varchar", length: 100 })
  title: string; // ex) 디아블로4, 바람의나라

  @IsEnum(DomainStatus)
  @Column({
    type: "enum",
    enum: DomainStatus,
    default: DomainStatus.MAINTENANCE,
  })
  status: DomainStatus;

  @OneToMany(() => BoardConfig, (boardConfig) => boardConfig.domain)
  boardConfigs: BoardConfig[];
}
