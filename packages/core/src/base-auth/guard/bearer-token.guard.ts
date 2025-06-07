import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { BaseAuthService } from "../base-auth.service";
import { BaseUserService } from "@_core/base-user/base-user.service";

@Injectable()
export class BearerTokenGuard implements CanActivate {
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

    if (extract.type !== "Bearer") {
      throw new UnauthorizedException("유효하지 않은 토큰 형식입니다.");
    }

    const decoded = await this.baseAuthService.verifyToken(extract.token);
    const user = await this.baseUserService.getUserByEmail(decoded.email);

    request.user = user;
    return true;
  }
}
