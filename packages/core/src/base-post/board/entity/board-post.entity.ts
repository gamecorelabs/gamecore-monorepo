import { BaseModel } from "@_core/base-common/entity/base.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BoardConfig } from "@_core/base-board/entity/board-config.entity";
import { IsEnum, IsNumber, IsString } from "class-validator";
import { BoardPostStatus } from "@_core/base-post/board/enum/board-post.enum";
import { UserAccount } from "@_core/base-user/entity/user-account.entity";
import { GuestAccount } from "@_core/base-common/entity/guest-account.embeddable";
import { Like } from "@_core/base-like/entity/like.entity";

@Entity()
export class BoardPost extends BaseModel {
  @Column(() => GuestAccount, { prefix: "" })
  guest_account: GuestAccount;

  // 제목
  @IsString()
  @Column({ type: "varchar", length: 50 })
  title: string;

  // 내용
  @IsString()
  @Column({ type: "text" })
  content: string;

  // 삭제 여부
  @IsEnum(BoardPostStatus)
  @Column({ default: BoardPostStatus.USE })
  status: number;

  // 조회수
  @IsNumber()
  @Column({ type: "int", default: 0 })
  view_count: number = 0;

  // 댓글 수
  @IsNumber()
  @Column({ type: "int", default: 0 })
  comment_count: number;

  // 좋아요 수
  @IsNumber()
  @Column({ type: "int", default: 0 })
  like_count: number;

  @ManyToOne(() => BoardConfig, (boardConfig) => boardConfig.boardPosts)
  @JoinColumn({ name: "board_id" })
  boardConfig: BoardConfig;

  @ManyToOne(() => UserAccount, (userAccount) => userAccount.posts)
  @JoinColumn({ name: "author_id" })
  author?: UserAccount;

  @IsString()
  @Column({ name: "ip_address", type: "varchar", length: 45, nullable: true })
  ip_address?: string;

  @OneToMany(() => Like, (like) => like.post)
  likes: Like[];
}
