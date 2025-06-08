import { Column } from "typeorm";
import { ResourceType } from "@_core/base-common/enum/common.enum";

/**
 * 같은 기능에 resource가 구분되는 경우에 사용되는 공용 embeddable 클래스
 * 댓글, 좋아요 (게시판, 댓글 등)
 */
export class ResourceInfo {
  @Column({ type: "enum", enum: ResourceType })
  resource_type: ResourceType;

  @Column()
  resource_id: number;

  @Column({ nullable: true })
  resource_sub_id?: number;
}
