import { PickType } from "@nestjs/mapped-types";
import { UserAccount } from "../entity/user-account.entity";

export class CreateUserProfileDto extends PickType(UserAccount, ["nickname"]) {
  profileImageFileName?: string | null;
}

export class RequestUserProfileDto extends PickType(CreateUserProfileDto, [
  "nickname",
]) {}
