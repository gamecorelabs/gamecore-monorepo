import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseModel } from "@_core/base-common/entity/base.entity";
import { IsEnum, IsString } from "class-validator";
import { CommentStatus } from "@_core/base-comment/enum/comment.enum";
import { UserAccount } from "@_core/base-user/entity/user-account.entity";
import { ResourceInfo } from "@_core/base-common/entity/resource-info.embeddable";
import { GuestAccount } from "@_core/base-common/entity/guest-account.embeddable";

@Entity()
export class Comment extends BaseModel {
  @Column(() => GuestAccount, { prefix: "" })
  guest_account: GuestAccount;

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

  @IsString()
  @Column({ name: "ip_address", type: "varchar", length: 45, nullable: true })
  ip_address?: string;
}
