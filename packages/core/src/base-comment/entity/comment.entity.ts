import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { BaseModel } from "@base-common/entity/base.entity";
import { IsEnum, IsString, IsNumber } from "class-validator";
import { CommentStatus } from "@base-comment/enum/comment.enum";
import { UserAccount } from "@base-user/entity/user-account.entity";
import { ResourceInfo } from "@base-common/entity/resource-info.embeddable";
import { GuestAccount } from "@base-common/entity/guest-account.embeddable";

@Index("IDX_resource", [
  "resourceInfo.resourceType",
  "resourceInfo.resourceId",
  "status",
])
@Entity()
export class Comment extends BaseModel {
  @Column(() => GuestAccount, { prefix: "" })
  guestAccount: GuestAccount;

  @Column(() => ResourceInfo, { prefix: "" })
  resourceInfo: ResourceInfo;

  @IsString()
  @Column()
  content: string;

  @IsEnum(CommentStatus)
  @Column({ type: "enum", enum: CommentStatus, default: CommentStatus.USE })
  status: CommentStatus;

  @ManyToOne(() => Comment, (comment) => comment.children, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "parentId" })
  parent?: Comment;

  @OneToMany(() => Comment, (comment) => comment.parent, {
    cascade: true,
  })
  children?: Comment[];

  // 좋아요 수
  @IsNumber()
  @Column({ type: "int", default: 0 })
  likeCount: number = 0;

  // 싫어요 수
  @IsNumber()
  @Column({ type: "int", default: 0 })
  dislikeCount: number = 0;

  @IsString()
  @Column({ name: "ipAddress", type: "varchar", length: 45, nullable: true })
  ipAddress?: string;

  @ManyToOne(() => UserAccount, (userAccount) => userAccount.comments)
  @JoinColumn({ name: "userAccountId" })
  author?: UserAccount;
}
