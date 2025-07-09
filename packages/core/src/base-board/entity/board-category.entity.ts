import { IsEnum, IsNumber, IsString } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BoardConfig } from "@gamecoregg/nestjs-core/base-board/entity/board-config.entity";
import { BaseModel } from "@gamecoregg/nestjs-core/base-common/entity/base.entity";
import { BoardCategoryStatus } from "../enum/board-category.enum";

@Entity()
export class BoardCategory extends BaseModel {
  @IsString()
  @Column({ type: "varchar", length: 50 })
  name: string;

  @IsNumber()
  @Column({ type: "int", default: 0 })
  order: number; // 정렬 순서

  @IsEnum(BoardCategoryStatus)
  @Column({
    type: "enum",
    enum: BoardCategoryStatus,
    default: BoardCategoryStatus.ACTIVE,
  })
  status: BoardCategoryStatus;

  @ManyToOne(() => BoardConfig, (board) => board.categories, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "board_config_id" })
  boardConfig: BoardConfig;
}
