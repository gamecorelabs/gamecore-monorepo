import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { BaseAuthService } from "../base-auth.service";
import { BaseUserService } from "@_core/base-user/base-user.service";
import { UserOrGuestLoginRequest } from "@_core/base-user/types/user.types";

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
      const token = extract.token;
      const decodedToken = Buffer.from(token, "base64").toString("utf-8");

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
          guest_account: {
            guest_author_id: guestAuthorId,
            guest_author_password: guestAuthorPassword,
          },
          ip_address:
            request.headers["x-forwarded-for"] || request.socket.remoteAddress,
        };
      } else {
        request.user = {
          type: "fingerprint",
          fingerprint: decodedToken,
          ip_address:
            request.headers["x-forwarded-for"] || request.socket.remoteAddress,
        };
      }
    }

    return true;
  }
}
