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

    const extract = this.baseAuthService.extractHeader(rawHeaderToken);
    const decoded = this.baseAuthService.decodeBasicToken(extract.token);

    request.decoded = decoded;

    return true;
  }
}
