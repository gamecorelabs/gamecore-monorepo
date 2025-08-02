import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { BasicTokenGuard } from "./basic-token.guard";

/**
 * CSRF 검증
 */
@Injectable()
export class CsrfTokenProtectionGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const csrfHeader = request.headers["x-csrf-token"];

    if (!csrfHeader) {
      throw new ForbiddenException("CSRF 토큰이 존재하지 않습니다.");
    }

    return true;
  }
}
