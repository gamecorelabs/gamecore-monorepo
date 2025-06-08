import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseModel } from "@_core/base-common/entity/base.entity";
import { IsBoolean, IsEnum, IsString } from "class-validator";
import { UserAccount } from "@_core/base-user/entity/user-account.entity";
import { BoardPost }  from "@_core/base-post/board/entity/board-post.entity";
import { Comment } from "@_core/base-comment/entity/comment.entity";
import { ResourceType } from "@_core/base-common/enum/common.enum";
import { ResourceInfo } from "@_core/base-common/entity/resource-info.embeddable";

@Entity()
export class Like extends BaseModel {
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
  @JoinColumn({ name: "post_id"})
  post?: BoardPost;

  @ManyToOne(() => )
  @JoinColumn({ name: "comment_id" })
  comment?: Comment;
}
