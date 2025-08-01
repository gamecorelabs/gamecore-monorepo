import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { BaseModel } from "@base-common/entity/base.entity";
import { IsBoolean, IsEnum, IsString } from "class-validator";
import { UserAccount } from "@base-user/entity/user-account.entity";
import { ResourceInfo } from "@base-common/entity/resource-info.embeddable";
import { LikeStatus, LikeType } from "../enum/like.enum";

@Index("IDX_resource", [
  "resourceInfo.resourceType",
  "resourceInfo.resourceId",
  "status",
])
@Entity()
export class Like extends BaseModel {
  @Column(() => ResourceInfo, { prefix: "" })
  resourceInfo: ResourceInfo;

  @IsEnum(LikeType)
  @Column({ type: "enum", enum: LikeType })
  type: LikeType;

  @IsEnum(LikeStatus)
  @Column({ type: "enum", enum: LikeStatus, default: LikeStatus.SELECTED })
  status: LikeStatus;

  @ManyToOne(() => UserAccount, (userAccount) => userAccount.comments)
  @JoinColumn({ name: "userAccountId" })
  author?: UserAccount;

  @IsString()
  @Column({ name: "ipAddress", type: "varchar", length: 45, nullable: true })
  ipAddress?: string;

  @IsString()
  @Column({ name: "fingerprint", type: "varchar", length: 45, nullable: true })
  fingerprint?: string;
}
