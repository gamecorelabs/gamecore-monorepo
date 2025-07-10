import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { BaseAuthService } from "../base-auth.service";
import { BaseUserService } from "@base-user/base-user.service";
import { GuestUserTokenGuard } from "./guest-user-token.guard";
import { UserTokenGuard } from "./user-token.guard";

@Injectable()
export class GuestOrUserTokenGuard implements CanActivate {
  constructor(
    private readonly guestUserTokenGuard: GuestUserTokenGuard,
    private readonly userTokenGuard: UserTokenGuard
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const rawHeaderToken = request.headers["authorization"] || "";
    // 비회원 요청시
    if (rawHeaderToken) {
      await this.guestUserTokenGuard.canActivate(context);
      return true;
    }

    // 회원 요청시
    const cookies = request.headers.cookie || "";
    if (cookies) {
      await this.userTokenGuard.canActivate(context);
      return true;
    }

    throw new UnauthorizedException(
      "비회원, 회원 어떠한 유형에도 속하지 않은 요청입니다. 다시 시도해주세요."
    );
  }
}
