import { BaseModel } from "@_core/base-common/entity/base.entity";
import { IsEnum, IsString } from "class-validator";
import { Column } from "typeorm";

/**
 * BaseCommentEntity
 * 각종 댓글 Entity의 공통 요소를 정의한다.
 */

// FIXME: Status 공용화
enum CommentStatus {
  DELETED = 0, // 삭제
  USE = 1, // 사용
  HOLD = 2, // 보류
  ADMIN_DELETED = 99, // 관리자 삭제
}

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

  @IsEnum(CommentStatus)
  @Column()
  status: number;
}
