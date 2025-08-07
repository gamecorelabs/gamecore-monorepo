import { PickType } from "@nestjs/mapped-types";
import { UserAccount } from "../entity/user-account.entity";
import { IsBoolean, IsOptional } from "class-validator";

export class CreateUserProfileDto extends PickType(UserAccount, ["nickname"]) {
  profileImageFileName?: string | null;

  @IsOptional()
  @IsBoolean()
  isImageRemoved?: boolean;
}

export class RequestUserProfileDto extends PickType(CreateUserProfileDto, [
  "nickname",
  "isImageRemoved",
]) {}
