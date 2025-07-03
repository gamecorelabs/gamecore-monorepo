import { Request as ExpressRequest } from "express";
import { UserAccount } from "../entity/user-account.entity";

export type UserLoginRequest = ExpressRequest & {
  type: "user";
  user_account: UserAccount;
};

export type GuestLoginRequest = ExpressRequest & {
  type: "guest";
  guest_account: {
    guest_author_id: string;
    guest_author_password: string;
  };
};

export type FingerprintRequest = ExpressRequest & {
  type: "fingerprint";
  fingerprint: string;
};

export type UserOrGuestLoginRequest = {
  ip_address: string;
} & (UserLoginRequest | GuestLoginRequest | FingerprintRequest);
