import { IsEnum, IsString } from "class-validator";
import { Column, Entity, OneToMany } from "typeorm";
import { BaseModel } from "@base-common/entity/base.entity";
import { BoardConfig } from "@base-board/entity/board-config.entity";
import { ChannelCategory, ChannelStatus } from "../enum/channel.enum";

@Entity()
export class ChannelConfig extends BaseModel {
  @IsEnum(ChannelCategory)
  @Column({ type: "enum", enum: ChannelCategory })
  category: ChannelCategory;

  @IsString()
  @Column({ type: "varchar", length: 50, unique: true })
  channel: string; // ex) diablo4, baram

  @IsString()
  @Column({ type: "varchar", length: 100 })
  title: string; // ex) 디아블로4, 바람의나라

  @IsEnum(ChannelStatus)
  @Column({
    type: "enum",
    enum: ChannelStatus,
    default: ChannelStatus.MAINTENANCE,
  })
  status: ChannelStatus;

  @OneToMany(() => BoardConfig, (boardConfig) => boardConfig.channel)
  boardConfigs: BoardConfig[];
}
