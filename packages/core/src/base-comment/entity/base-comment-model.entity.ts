import { BaseModel } from "@_core/base-common/entity/base.entity";
import { IsString } from "class-validator";
import { Column } from "typeorm";

/**
 * BaseCommentEntity
 * 각종 댓글 Entity의 공통 요소를 정의한다.
 */

export class BaseCommentModel extends BaseModel {
  // (비회원) 작성자 닉네임
  @IsString()
  @Column({ type: "varchar", length: 20, nullable: true })
  guest_author_id?: string;

  // (비회원) 작성자 패스워드
  // FIXME: 일단 비암호화 상태로 작업, 추후 변경
  @IsString()
  @Column({ type: "varchar", length: 20, nullable: true })
  guest_author_password?: string;

  @IsString()
  @Column({ type: "varchar", length: 500 })
  content: string;
}
