import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { BaseAuthService } from "../base-auth.service";
import { BaseUserService } from "@base-user/base-user.service";
import { UserOrGuestLoginRequest } from "@base-user/types/user.types";

@Injectable()
export class GuestUserTokenGuard implements CanActivate {
  constructor(
    private readonly baseAuthService: BaseAuthService,
    private readonly baseUserService: BaseUserService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const rawHeaderToken = request.headers["authorization"];

    if (!rawHeaderToken) {
      throw new UnauthorizedException("토큰이 존재하지 않습니다.");
    }

    const extract = this.baseAuthService.extractHeader(rawHeaderToken);

    if (extract.type === "Basic") {
      const decodedToken = this.baseAuthService.decodeBasicToken(extract.token);

      if (decodedToken.includes(":")) {
        const decoded = this.baseAuthService.splitBasicToken(decodedToken);
        const [guestAuthorId, guestAuthorPassword] = decoded;
        if (!guestAuthorId || !guestAuthorPassword) {
          throw new UnauthorizedException(
            "비회원으로 입력하신 정보를 찾을 수 없습니다."
          );
        }

        request.user = {
          type: "guest",
          guestAccount: {
            guestAuthorId: guestAuthorId,
            guestAuthorPassword: guestAuthorPassword,
          },
          ipAddress:
            request.headers["x-forwarded-for"] || request.socket.remoteAddress,
        };
      } else {
        request.user = {
          type: "fingerprint",
          fingerprint: decodedToken,
          ipAddress:
            request.headers["x-forwarded-for"] || request.socket.remoteAddress,
        };
      }
    }

    return true;
  }
}
