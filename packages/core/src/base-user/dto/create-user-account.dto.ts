import { PickType } from "@nestjs/mapped-types";
import { UserAccount } from "../entity/user-account.entity";

export class CreateUserAccountDto extends PickType(UserAccount, [
  "email",
  "password",
  "nickname",
]) {
  // 추가 필드가 필요한 경우 여기에 정의
  providerType?: UserAccount["providerType"];
  providerId?: UserAccount["providerId"];
}
