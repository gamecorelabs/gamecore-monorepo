import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseModel } from "@_core/base-common/entity/base.entity";
import { IsEnum, IsString } from "class-validator";
import { CommentStatus } from "@_core/base-comment/enum/comment.enum";
import { UserAccount } from "@_core/base-user/entity/user-account.entity";
import { ResourceType } from "@_core/base-common/enum/common.enum";
import { ResourceInfo } from "@_core/base-common/entity/resource-info.embeddable";

@Entity()
export class Comment extends BaseModel {
  // (비회원) 작성자 닉네임
  @IsString()
  @Column({ type: "varchar", length: 20, nullable: true })
  guest_author_id?: string;

  // (비회원) 작성자 패스워드
  // FIXME: 일단 비암호화 상태로 작업, 추후 변경
  @IsString()
  @Column({ type: "varchar", length: 200, nullable: true })
  guest_author_password?: string;

  @Column(() => ResourceInfo, { prefix: "" })
  resource_info: ResourceInfo;

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

  @ManyToOne(() => UserAccount, (userAccount) => userAccount.comments)
  @JoinColumn({ name: "author_id" })
  author?: UserAccount;
}
