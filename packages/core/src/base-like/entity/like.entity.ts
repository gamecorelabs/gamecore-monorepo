import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { BaseModel } from "@base-common/entity/base.entity";
import { IsBoolean, IsEnum, IsString } from "class-validator";
import { UserAccount } from "@base-user/entity/user-account.entity";
import { BoardPost } from "@base-post/board/entity/board-post.entity";
import { Comment } from "@base-comment/entity/comment.entity";
import { ResourceInfo } from "@base-common/entity/resource-info.embeddable";
import { Transform } from "class-transformer";
import { LikeStatus, LikeType } from "../enum/like.enum";

@Index("IDX_resource", [
  "resource_info.resource_type",
  "resource_info.resource_id",
  "status",
])
@Entity()
export class Like extends BaseModel {
  @Column(() => ResourceInfo, { prefix: "" })
  resource_info: ResourceInfo;

  @IsEnum(LikeType)
  @Column({ type: "enum", enum: LikeType })
  type: LikeType;

  @IsEnum(LikeStatus)
  @Column({ type: "enum", enum: LikeStatus, default: LikeStatus.SELECTED })
  status: LikeStatus;

  @ManyToOne(() => UserAccount, (userAccount) => userAccount.comments)
  @JoinColumn({ name: "author_id" })
  author?: UserAccount;

  @IsString()
  @Column({ name: "ip_address", type: "varchar", length: 45, nullable: true })
  ip_address?: string;

  @IsString()
  @Column({ name: "fingerprint", type: "varchar", length: 45, nullable: true })
  fingerprint?: string;
}
