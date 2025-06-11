import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseModel } from "@_core/base-common/entity/base.entity";
import { IsBoolean, IsEnum, IsString } from "class-validator";
import { UserAccount } from "@_core/base-user/entity/user-account.entity";
import { BoardPost } from "@_core/base-post/board/entity/board-post.entity";
import { Comment } from "@_core/base-comment/entity/comment.entity";
import { ResourceInfo } from "@_core/base-common/entity/resource-info.embeddable";

@Entity()
export class Like extends BaseModel {
  @Column(() => ResourceInfo, { prefix: "" })
  resource_info: ResourceInfo;

  @IsBoolean()
  @Column({ default: true })
  is_liked: boolean = true; // false dislike

  @IsBoolean()
  @Column({ default: true })
  status: boolean = true;

  @ManyToOne(() => UserAccount, (userAccount) => userAccount.comments)
  @JoinColumn({ name: "author_id" })
  author?: UserAccount;

  @ManyToOne(() => BoardPost, (boardPost) => boardPost.likes)
  @JoinColumn({ name: "post_id" })
  post?: BoardPost;

  @ManyToOne(() => Comment, (comment) => comment.likes)
  @JoinColumn({ name: "comment_id" })
  comment?: Comment;

  @IsString()
  @Column({ name: "ip_address", type: "varchar", length: 45, nullable: true })
  ip_address?: string;
}
