import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty, IsString } from "class-validator";
import { BaseModel } from "src/common/entity/base.entity";

@Entity()
export class TestUser extends BaseModel {
  @IsString()
  @IsNotEmpty()
  @Column({ type: "varchar", length: 50, unique: true })
  nickname: string;
}
