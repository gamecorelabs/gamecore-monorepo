import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseModel } from "@base-common/entity/base.entity";
import { IsEnum, IsNumber, IsString } from "class-validator";
import { NewsPost } from "@base-post/news/entity/news-post.entity";
import { NewsStatus } from "../enum/news-config.enum";
import { NewsCategory } from "./news-category.entity";
import { NewsType } from "../enum/news-type.enum";

@Entity()
export class NewsConfig extends BaseModel {
  @IsString()
  @Column({ type: "varchar", length: 100 })
  title: string;

  @IsString()
  @Column({ type: "varchar", length: 255 })
  description?: string;

  @IsEnum(NewsType)
  @Column({
    type: "enum",
    enum: NewsType,
    default: NewsType.GAME, // 기본값은 GAME
  })
  type: NewsType;

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
