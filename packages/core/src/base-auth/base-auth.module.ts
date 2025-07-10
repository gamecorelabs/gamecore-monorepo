import { Module } from "@nestjs/common";
import { BaseAuthService } from "./base-auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserAccount } from "@base-user/entity/user-account.entity";
import { BaseUserModule } from "@base-user/base-user.module";
import { JwtModule } from "@nestjs/jwt";
import { GuestUserTokenGuard } from "./guard/guest-user-token.guard";
import { UserTokenGuard } from "./guard/user-token.guard";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserAccount]),
    BaseUserModule,
    JwtModule.register({}),
  ],
  providers: [BaseAuthService, GuestUserTokenGuard, UserTokenGuard],
  exports: [BaseAuthService, GuestUserTokenGuard, UserTokenGuard],
})
export class BaseAuthModule {}
