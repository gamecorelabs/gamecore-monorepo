import { ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { BearerTokenGuard } from "./bearer-token.guard";
import { UserRoles } from "@_core/base-user/enum/user.enum";

export class AdminGradeUserGuard extends BearerTokenGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Check if the user has admin grade
    if (![UserRoles.ADMIN, UserRoles.SUPER_ADMIN].includes(user.role)) {
      throw new UnauthorizedException("관리자 권한이 필요합니다.");
    }

    return true;
  }
}
