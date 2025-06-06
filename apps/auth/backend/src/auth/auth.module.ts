import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAccount } from '@_core/base-user/entity/user-account.entity';
import { BaseUserModule } from '@_core/base-user/base-user.module';
import { BaseAuthModule } from '@_core/base-auth/base-auth.module';
// import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserAccount]),
    // JwtModule.register({}),
    BaseUserModule,
    BaseAuthModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
