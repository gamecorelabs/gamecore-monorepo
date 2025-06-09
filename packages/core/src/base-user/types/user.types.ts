import { UserAccount } from "../entity/user-account.entity";

export type UserLoginRequest = UserAccount & {
  type: "user";
  ip_address: string;
};

export type GuestLoginRequest = {
  type: "guest";
  guest_author_id: string;
  guest_author_password: string;
  ip_address: string;
};

export type UserOrGuestLoginRequest = UserLoginRequest | GuestLoginRequest;
