import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { BaseAuthService } from "@base-auth/base-auth.service";
import { BaseUserService } from "@base-user/base-user.service";

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly baseAuthService: BaseAuthService,
    private readonly baseUserService: BaseUserService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken = request.cookies?.accessToken;

    if (!accessToken) {
      throw new UnauthorizedException("accessToken이 존재하지 않습니다.");
    }

    try {
      const decoded = await this.baseAuthService.verifyToken(accessToken);
      const user = await this.baseUserService.getUserByEmail(decoded.email);

      if (!user) {
        throw new BadRequestException("존재하지 않는 사용자입니다.");
      }

      request.user = {
        type: "user",
        userAccount: user,
      };
      // client IP 주소 설정
      request.user.ipAddress =
        request.headers["x-forwarded-for"] || request.socket.remoteAddress;
      return true;
    } catch (err) {
      throw new UnauthorizedException("Invalid accessToken");
    }
  }
}
