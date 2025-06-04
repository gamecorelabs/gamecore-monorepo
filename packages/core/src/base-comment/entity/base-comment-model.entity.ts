import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseModel } from "@_core/base-common/entity/base.entity";
import { IsEnum, IsString } from "class-validator";

/**
 * BaseCommentEntity
 * 각종 댓글 Entity의 공통 요소를 정의한다.
 */

// FIXME: Status 공용화
export enum CommentStatus {
  DELETED = 0, // 삭제
  USE = 1, // 사용
  HOLD = 2, // 보류
  ADMIN_DELETED = 99, // 관리자 삭제
}

export enum ResourceType {
  BOARD_POST = "board", // 게시판 글
  NEWS_POST = "news", // 뉴스 글
  GUIDE_POST = "guide", // 가이드 글
}

@Entity()
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

  @Column({ type: "enum", enum: ResourceType })
  resource_type: ResourceType;

  @Column()
  resource_id: number;

  @Column()
  resource_sub_id?: number;

  @Column()
  content: string;

  @IsEnum(CommentStatus)
  @Column({ type: "int", default: CommentStatus.USE })
  status: CommentStatus = CommentStatus.USE;

  @ManyToOne(() => BaseCommentModel, (comment) => comment.children, {
    nullable: true,
    onDelete: "CASCADE",
  })
  parent?: BaseCommentModel;

  @OneToMany(() => BaseCommentModel, (comment) => comment.parent, {
    cascade: true,
  })
  children?: BaseCommentModel[];
}
