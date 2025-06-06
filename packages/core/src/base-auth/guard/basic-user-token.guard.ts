import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { BasicTokenGuard } from "./basic-token.guard";

/**
 * 유저 로그인 Basic Token guard
 */
@Injectable()
export class BasicUserTokenGuard extends BasicTokenGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);
    const request = context.switchToHttp().getRequest();

    const [email, password] = request.decoded;

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
