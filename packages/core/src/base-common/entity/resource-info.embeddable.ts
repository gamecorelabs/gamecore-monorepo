import { Column } from "typeorm";
import { ResourceType } from "@base-common/enum/common.enum";
import { IsEnum, IsNumber } from "class-validator";

/**
 * 같은 기능에 resource가 구분되는 경우에 사용되는 공용 embeddable 클래스
 * 댓글, 좋아요 (게시판, 댓글 등)
 */
export class ResourceInfo {
  @IsEnum(ResourceType)
  @Column({ type: "enum", enum: ResourceType })
  resource_type: ResourceType;

  @IsNumber()
  @Column()
  resource_id: number;
}
