import { ENV_JWT_SECRET } from "@_core/base-common/const/env-keys.const";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { UserAccount } from "@_core/base-user/entity/user-account.entity";
import { TOKEN_EXPIRE } from "./const/auth.const";
import { JwtService } from "@nestjs/jwt";
import { Response as ExpressResponse } from "express";

@Injectable()
export class BaseAuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  /** 토큰 검증 */
  async verifyToken(token: string) {
    try {
      return await this.jwtService.verify(token, {
        secret: this.configService.get<string>(ENV_JWT_SECRET),
      });
    } catch (error) {
      throw new UnauthorizedException(
        "토큰이 만료 되었거나 잘못된 토큰입니다."
      );
    }
  }

  /** 토큰 발급  */
  getIssuanceToken(userAccount: UserAccount, tokenType?: "access" | "refresh") {
    if (tokenType) {
      return {
        [`${tokenType}Token`]: this.signToken(userAccount, tokenType),
      };
    } else {
      return {
        accessToken: this.signToken(userAccount, "access"),
        refreshToken: this.signToken(userAccount, "refresh"),
      };
    }
  }

  signToken(
    user: Pick<UserAccount, "id" | "email">,
    type: "access" | "refresh"
  ) {
    const payload = {
      sub: user.id,
      email: user.email,
      type,
    };

    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>(ENV_JWT_SECRET),
      expiresIn: TOKEN_EXPIRE[type],
    });
  }

  async logoutUser() {
    // refresh 토큰 폐기
  }

  extractHeader(authHeader: string): { token: string; type: string } {
    const prefix = ["Bearer", "Basic"];
    const splitHeader = authHeader.split(" ");

    if (splitHeader.length !== 2 || !prefix.includes(splitHeader[0])) {
      throw new UnauthorizedException("토큰이 잘못되었습니다.");
    }

    const token = splitHeader[1];

    return {
      token,
      type: splitHeader[0],
    };
  }

  decodeBasicToken(token: string) {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const splitDecoded = decoded.split(":");

    if (splitDecoded.length !== 2) {
      throw new UnauthorizedException("잘못된 유형의 토큰입니다.");
    }

    return splitDecoded;

    // const [email, password] = splitDecoded;

    // return {
    //   email,
    //   password,
    // };
  }

  // 쿠키에 토큰 설정
  async setTokenCookie(
    res: ExpressResponse,
    tokenData: {
      accessToken?: string;
      refreshToken?: string;
    }
  ) {
    if (tokenData.accessToken) {
      res.cookie("access_token", tokenData.accessToken, {
        httpOnly: true,
        secure: true, // FIXME: dev
        sameSite: "none", // FIXME: dev
        maxAge: TOKEN_EXPIRE.access * 1000,
      });
    }

    if (tokenData.refreshToken) {
      res.cookie("refresh_token", tokenData.refreshToken, {
        httpOnly: true,
        secure: true, // FIXME: dev
        sameSite: "none", // FIXME: dev
        maxAge: TOKEN_EXPIRE.refresh * 1000,
      });
    }

    return { success: true };
  }
}
