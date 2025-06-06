import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { BaseAuthService } from "../base-auth.service";
import { BaseUserService } from "@_core/base-user/base-user.service";

@Injectable()
export class GuestOrUserTokenGuard implements CanActivate {
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
        throw new UnauthorizedException("계정 정보를 찾을 수 없습니다.");
      }

      request.user = {
        guest_author_id,
        guest_author_password,
      };
    }

    // 회원으로 접근시
    if (extract.type === "Bearer") {
      const decoded = await this.baseAuthService.verifyToken(extract.token);
      const user = await this.baseUserService.getUserByEmail(decoded.email);

      request.user = user;
    }

    return true;
  }
}
