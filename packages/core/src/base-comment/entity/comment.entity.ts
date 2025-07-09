import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { BaseModel } from "@gamecoregg/nestjs-core/base-common/entity/base.entity";
import { IsEnum, IsString, IsNumber } from "class-validator";
import { CommentStatus } from "@gamecoregg/nestjs-core/base-comment/enum/comment.enum";
import { UserAccount } from "@gamecoregg/nestjs-core/base-user/entity/user-account.entity";
import { ResourceInfo } from "@gamecoregg/nestjs-core/base-common/entity/resource-info.embeddable";
import { GuestAccount } from "@gamecoregg/nestjs-core/base-common/entity/guest-account.embeddable";
import { Like } from "@gamecoregg/nestjs-core/base-like/entity/like.entity";
import { BoardPost } from "@gamecoregg/nestjs-core/base-post/board/entity/board-post.entity";

@Index("IDX_resource", [
  "resource_info.resource_type",
  "resource_info.resource_id",
  "status",
])
@Entity()
export class Comment extends BaseModel {
  @Column(() => GuestAccount, { prefix: "" })
  guest_account: GuestAccount;

  @Column(() => ResourceInfo, { prefix: "" })
  resource_info: ResourceInfo;

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
  @JoinColumn({ name: "parent_id" })
  parent?: Comment;

  @OneToMany(() => Comment, (comment) => comment.parent, {
    cascade: true,
  })
  children?: Comment[];

  // 좋아요 수
  @IsNumber()
  @Column({ type: "int", default: 0 })
  like_count: number = 0;

  // 싫어요 수
  @IsNumber()
  @Column({ type: "int", default: 0 })
  dislike_count: number = 0;

  @IsString()
  @Column({ name: "ip_address", type: "varchar", length: 45, nullable: true })
  ip_address?: string;

  @ManyToOne(() => UserAccount, (userAccount) => userAccount.comments)
  @JoinColumn({ name: "author_id" })
  author?: UserAccount;
}
