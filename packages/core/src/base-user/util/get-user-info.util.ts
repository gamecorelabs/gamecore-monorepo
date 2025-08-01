import { UserOrGuestLoginRequest } from "@base-user/types/user.types";
import { InternalServerErrorException } from "@nestjs/common";
import * as bcrpyt from "bcrypt";

type UserInfo =
  | {
      author: { id: number };
    }
  | {
      guestAccount: {
        guestAuthorId: string;
        guestAuthorPassword: string;
      };
    }
  | {
      fingerprint: string;
    };

export const getUserInfo = async (
  user: UserOrGuestLoginRequest,
  hashRounds = 10
): Promise<UserInfo> => {
  let userInfo: UserInfo;
  switch (user.type) {
    case "user":
      userInfo = {
        author: { id: user.userAccount.id },
      };
      break;
    case "guest":
      const hash = await bcrpyt.hash(
        user.guestAccount.guestAuthorPassword,
        hashRounds
      );
      userInfo = {
        guestAccount: {
          guestAuthorId: user.guestAccount.guestAuthorId,
          guestAuthorPassword: hash,
        },
      };
      break;
    case "fingerprint":
      userInfo = {
        fingerprint: user.fingerprint,
      };
      break;
    default:
      throw new InternalServerErrorException("사용자 정보가 없습니다.");
  }

  return userInfo;
};
