import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAccount } from '@_core/base-user/entity/user-account.entity';
import { BaseUserModule } from '@_core/base-user/base-user.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserAccount]), BaseUserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
