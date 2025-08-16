import { BaseModel } from "@base-common/entity/base.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { IsEnum, IsNumber, IsString } from "class-validator";
import { NewsPostStatus } from "@base-post/news/enum/news-post.enum";
import { UserAccount } from "@base-user/entity/user-account.entity";
import { NewsConfig } from "@base-news/entity/news-config.entity";
import { NewsCategory } from "@base-news/entity/news-category.entity";

@Entity()
export class NewsPost extends BaseModel {
  // 제목
  @IsString()
  @Column({ type: "varchar", length: 50 })
  title: string;

  // 내용
  @IsString()
  @Column({ type: "text" })
  content: string;

  // 삭제 여부
  @IsEnum(NewsPostStatus)
  @Column({ type: "enum", enum: NewsPostStatus, default: NewsPostStatus.USE })
  status: NewsPostStatus;

  // 썸네일 path
  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  @IsString()
  thumbnail?: string;

  // 조회수
  @IsNumber()
  @Column({ type: "int", default: 0 })
  viewCount: number = 0;

  // 좋아요 수
  @IsNumber()
  @Column({ type: "int", default: 0 })
  likeCount: number = 0;

  // 싫어요 수
  @IsNumber()
  @Column({ type: "int", default: 0 })
  dislikeCount: number = 0;

  // 댓글 수
  @IsNumber()
  @Column({ type: "int", default: 0 })
  commentCount: number = 0;

  @ManyToOne(() => NewsConfig, (newsConfig) => newsConfig.newsPosts)
  @JoinColumn({ name: "newsConfigId" })
  newsConfig: NewsConfig;

  @ManyToOne(() => UserAccount, (userAccount) => userAccount.posts)
  @JoinColumn({ name: "userAccountId" })
  author?: UserAccount;

  @ManyToOne(() => NewsCategory, (newsCategory) => newsCategory.newsPosts)
  category?: NewsCategory;

  @IsString()
  @Column({ name: "ipAddress", type: "varchar", length: 45, nullable: true })
  ipAddress?: string;
}
