import { IsEnum, IsNumber, IsString } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseModel } from "@base-common/entity/base.entity";
import { NewsCategoryStatus } from "../enum/news-category.enum";
import { NewsPost } from "@base-post/news/entity/news-post.entity";
import { NewsConfig } from "./news-config.entity";

@Entity()
export class NewsCategory extends BaseModel {
  @IsString()
  @Column({ type: "varchar", length: 50 })
  title: string;

  @IsNumber()
  @Column({ type: "int", default: 0 })
  order: number; // 정렬 순서

  @IsEnum(NewsCategoryStatus)
  @Column({
    type: "enum",
    enum: NewsCategoryStatus,
    default: NewsCategoryStatus.ACTIVE,
  })
  status: NewsCategoryStatus;

  @ManyToOne(() => NewsConfig, (news) => news.categories, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "newsConfigId" })
  newsConfig: NewsConfig;

  @OneToMany(() => NewsPost, (post) => post.category)
  newsPosts: NewsPost[];
}
