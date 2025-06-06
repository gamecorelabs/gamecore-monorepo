import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { BaseAuthService } from "../base-auth.service";

@Injectable()
export class BasicTokenGuard implements CanActivate {
  constructor(private readonly baseAuthService: BaseAuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const rawHeaderToken = request.headers["authorization"];

    if (!rawHeaderToken) {
      throw new UnauthorizedException("토큰이 존재하지 않습니다.");
    }

    const token = this.baseAuthService.extractToken(rawHeaderToken);
    const { email, password } = this.baseAuthService.decodeBasicToken(token);

    if (!email || !password) {
      throw new UnauthorizedException("계정 정보를 찾을 수 없습니다.");
    }

    request.loginInfo = {
      email,
      password,
    };

    return true;
  }
}
