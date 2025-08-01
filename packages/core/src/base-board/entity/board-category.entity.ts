import { IsEnum, IsNumber, IsString } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BoardConfig } from "@base-board/entity/board-config.entity";
import { BaseModel } from "@base-common/entity/base.entity";
import { BoardCategoryStatus } from "../enum/board-category.enum";
import { BoardPost } from "@base-post/board/entity/board-post.entity";

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

  @OneToMany(() => BoardPost, (post) => post.category)
  boardPosts: BoardPost[];
}
