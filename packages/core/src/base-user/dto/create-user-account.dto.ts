import { PickType } from "@nestjs/mapped-types";
import { UserAccount } from "../entity/user-account.entity";

export class CreateUserAccountDto extends PickType(UserAccount, [
  "email",
  "password",
  "nickname",
]) {}
