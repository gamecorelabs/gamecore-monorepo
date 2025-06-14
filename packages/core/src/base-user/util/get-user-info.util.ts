import { UserOrGuestLoginRequest } from "@_core/base-user/types/user.types";
import { InternalServerErrorException } from "@nestjs/common";
import * as bcrpyt from "bcrypt";

type UserInfo =
  | {
      author: { id: number };
    }
  | {
      guest_account: {
        guest_author_id: string;
        guest_author_password: string;
      };
    };

export const getUserInfo = async (
  user: UserOrGuestLoginRequest,
  hashRounds = 10
): Promise<UserInfo> => {
  let userInfo: UserInfo;
  switch (user.type) {
    case "user":
      userInfo = {
        author: { id: user.id },
      };
      break;
    case "guest":
      const hash = await bcrpyt.hash(user.guest_author_password, hashRounds);
      userInfo = {
        guest_account: {
          guest_author_id: user.guest_author_id,
          guest_author_password: hash,
        },
      };
      break;
    default:
      throw new InternalServerErrorException("사용자 정보가 없습니다.");
  }

  return userInfo;
};
