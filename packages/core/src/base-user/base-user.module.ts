import { Module } from "@nestjs/common";
import { BaseUserService } from "./base-user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserAccount } from "./entity/user-account.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserAccount])],
  providers: [BaseUserService],
  exports: [BaseUserService],
})
export class BaseUserModule {}
