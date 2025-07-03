import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { BaseAuthService } from "../base-auth.service";
import { BaseUserService } from "@_core/base-user/base-user.service";
import { AUTH_HTTP_STATUS_CODE } from "../const/auth.const";
import { UserOrGuestLoginRequest } from "@_core/base-user/types/user.types";

@Injectable()
export class UserTokenGuard implements CanActivate {
  constructor(
    private readonly baseAuthService: BaseAuthService,
    private readonly baseUserService: BaseUserService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const cookies = request.headers.cookie || "";

    if (!cookies) {
      throw new UnauthorizedException("로그인이 필요한 서비스입니다");
    }

    const parsedToken = this.parseCookies(cookies);
    const accessToken = parsedToken["accessToken"] || "";

    if (!accessToken) {
      throw new HttpException(
        "엑세스 토큰이 존재하지 않습니다.",
        AUTH_HTTP_STATUS_CODE.ACCESS_TOKEN_EXPIRED
      );
    }

    const decoded = await this.baseAuthService.verifyToken(accessToken, true);

    if (!decoded) {
      throw new HttpException(
        "엑세스 토큰이 만료되었습니다.",
        AUTH_HTTP_STATUS_CODE.ACCESS_TOKEN_EXPIRED
      );
    }

    const user = await this.baseUserService.getUserByEmail(decoded.email);

    request.user = {
      type: "user",
      user_account: user,
      ip_address:
        request.headers["x-forwarded-for"] || request.socket.remoteAddress,
    } as UserOrGuestLoginRequest;
    return true;
  }

  private parseCookies(cookieHeader: string = ""): Record<string, string> {
    return cookieHeader
      .split(";")
      .map((cookie) => cookie.trim())
      .filter((cookie) => cookie.includes("="))
      .reduce(
        (acc, cookie) => {
          const [key, value] = cookie.split("=");
          acc[key] = value;
          return acc;
        },
        {} as Record<string, string>
      );
  }
}
