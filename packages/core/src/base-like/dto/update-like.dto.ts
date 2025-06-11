import { PartialType, PickType } from "@nestjs/mapped-types";
import { Like } from "../entity/like.entity";
import { IsEnum, IsOptional } from "class-validator";
import { LikeStatus, LikeType } from "../enum/like.enum";

export class UpdateLikeDto extends PartialType(
  PickType(Like, ["type", "status"])
) {
  @IsOptional()
  @IsEnum(LikeType)
  type?: LikeType;

  @IsOptional()
  @IsEnum(LikeStatus)
  status?: LikeStatus;
}
