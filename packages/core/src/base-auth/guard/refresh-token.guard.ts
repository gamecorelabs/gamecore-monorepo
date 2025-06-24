import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { BaseAuthService } from "@_core/base-auth/base-auth.service";
import { BaseUserService } from "@_core/base-user/base-user.service";

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(
    private readonly baseAuthService: BaseAuthService,
    private readonly baseUserService: BaseUserService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const refreshToken = request.cookies?.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedException("refresh token이 존재하지 않습니다.");
    }

    try {
      const decoded = await this.baseAuthService.verifyToken(refreshToken);
      const user = await this.baseUserService.getUserByEmail(decoded.email);

      request.user = {
        type: "user",
        user_account: user,
      };
      // client IP 주소 설정
      request.user.ip_address =
        request.headers["x-forwarded-for"] || request.socket.remoteAddress;
      return true;
    } catch (err) {
      throw new UnauthorizedException("Invalid refresh token");
    }
  }
}
