import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseModel } from "@base-common/entity/base.entity";
import { IsEnum, IsNumber, IsString } from "class-validator";
import { NewsPost } from "@base-post/news/entity/news-post.entity";
import { NewsStatus } from "../enum/news-config.enum";
import { NewsCategory } from "./news-category.entity";

@Entity()
export class NewsConfig extends BaseModel {
  @IsString()
  @Column({ type: "varchar", length: 100 })
  title: string; // 바람의나라 자유게시판

  @IsString()
  @Column({ type: "varchar", length: 255 })
  description?: string;

  @IsEnum(NewsStatus)
  @Column({ type: "enum", enum: NewsStatus, default: NewsStatus.ACTIVE })
  status: NewsStatus;

  @OneToMany(() => NewsPost, (NewsPost) => NewsPost.newsConfig)
  newsPosts: NewsPost[]; // 뉴스 대분류에 속한 뉴스들들

  @OneToMany(() => NewsCategory, (category) => category.newsConfig, {
    cascade: true,
  })
  categories: NewsCategory[];
}
