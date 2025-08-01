import { Request as ExpressRequest } from "express";
import { UserAccount } from "../entity/user-account.entity";

export type UserLoginRequest = ExpressRequest & {
  type: "user";
  userAccount: UserAccount;
};

export type GuestLoginRequest = ExpressRequest & {
  type: "guest";
  guestAccount: {
    guestAuthorId: string;
    guestAuthorPassword: string;
  };
};

export type FingerprintRequest = ExpressRequest & {
  type: "fingerprint";
  fingerprint: string;
};

export type UserOrGuestLoginRequest = {
  ipAddress: string;
} & (UserLoginRequest | GuestLoginRequest | FingerprintRequest);
