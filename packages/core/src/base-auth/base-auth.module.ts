import { Module } from "@nestjs/common";
import { BaseAuthService } from "./base-auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserAccount } from "@_core/base-user/entity/user-account.entity";
import { BaseUserModule } from "@_core/base-user/base-user.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserAccount]),
    BaseUserModule,
    JwtModule.register({}),
  ],
  providers: [BaseAuthService],
  exports: [BaseAuthService],
})
export class BaseAuthModule {}
