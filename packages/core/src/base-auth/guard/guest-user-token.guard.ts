import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { BaseAuthService } from "../base-auth.service";
import { BaseUserService } from "@_core/base-user/base-user.service";

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

    // 비회원으로 접근시
    if (extract.type === "Basic") {
      const decoded = this.baseAuthService.decodeBasicToken(extract.token);
      const [guest_author_id, guest_author_password] = decoded;
      if (!guest_author_id || !guest_author_password) {
        throw new UnauthorizedException(
          "비회원으로 입력하신 정보를 찾을 수 없습니다."
        );
      }

      request.user = {
        type: "guest",
        guest_author_id,
        guest_author_password,
      };
    }

    return true;
  }
}
