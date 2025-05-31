import { Column, Entity } from "typeorm";
import { BaseModel } from "../../base-common/entity/base.entity";
import { IsBoolean, IsString } from "class-validator";

/**
 * 게시판 설정 엔티티
 * 이 엔티티는 게시판 생성 및 설정 정보를 저장합니다.
 */
@Entity()
export class BaseBoardConfig extends BaseModel {
  @IsString()
  @Column({ length: 100, unique: true })
  domain: string;

  @IsString()
  @Column({ length: 200, unique: true })
  table_name: string;
  /**
   * 게시판 이름
   */
  @IsString()
  @Column({ length: 50 })
  board_name: string;

  @IsString()
  @Column({ length: 255 })
  description: string;

  @IsBoolean()
  is_public?: boolean = false;
}
