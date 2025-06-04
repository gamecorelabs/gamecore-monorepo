import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseModel } from "@_core/base-common/entity/base.entity";
import { IsEnum, IsString } from "class-validator";
import {
  ResourceType,
  CommentStatus,
} from "@_core/base-comment/enum/comment.enum";

/**
 * BaseCommentEntity
 * 각종 댓글 Entity의 공통 요소를 정의한다.
 */

@Entity()
export class Comment extends BaseModel {
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

  @ManyToOne(() => Comment, (comment) => comment.children, {
    nullable: true,
    onDelete: "CASCADE",
  })
  parent?: Comment;

  @OneToMany(() => Comment, (comment) => comment.parent, {
    cascade: true,
  })
  children?: Comment[];
}
