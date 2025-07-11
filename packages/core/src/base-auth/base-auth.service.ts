import { ENV_JWT_SECRET } from "@base-common/const/env-keys.const";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { UserAccount } from "@base-user/entity/user-account.entity";
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
  async verifyToken(token: string, redraw: boolean = false) {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>(ENV_JWT_SECRET),
      });
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        if (redraw) {
          return false;
        }
        throw new UnauthorizedException("토큰이 만료되었습니다.");
      } else {
        throw new UnauthorizedException("잘못된 토큰입니다.");
      }
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
    if (!token || !token.match(/^[A-Za-z0-9+/]+={0,2}$/)) {
      throw new UnauthorizedException("잘못된 형식의 토큰입니다.");
    }
    return Buffer.from(token, "base64").toString("utf-8");
  }

  splitBasicToken(token: string) {
    const splitDecoded = token.split(":");

    if (splitDecoded.length !== 2) {
      throw new UnauthorizedException("잘못된 유형의 토큰입니다.");
    }

    return splitDecoded;
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
      res.cookie("accessToken", tokenData.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        domain: ".gamecore.co.kr",
        maxAge: TOKEN_EXPIRE.access * 1000,
      });
    }

    if (tokenData.refreshToken) {
      res.cookie("refreshToken", tokenData.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        domain: ".gamecore.co.kr",
        maxAge: TOKEN_EXPIRE.refresh * 1000,
      });
    }

    return { success: true };
  }

  async clearTokenCookie(res: ExpressResponse) {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      domain: ".gamecore.co.kr",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      domain: ".gamecore.co.kr",
    });

    return { success: true };
  }
}
