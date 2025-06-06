import {
  Body,
  Controller,
  Headers,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserAccountDto } from '@_core/base-user/dto/create-user-account.dto';
import { BaseAuthService } from '@_core/base-auth/base-auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly baseAuthService: BaseAuthService,
  ) {}

  @Post('register')
  async registerUser(@Body() dto: CreateUserAccountDto) {
    return await this.authService.registerUser(dto);
  }

  @Post('login')
  async loginUser(@Headers('Authorization') authHeader: string) {
    const token = this.baseAuthService.extractToken(authHeader);
    const loginInfo = this.baseAuthService.decodeBasicToken(token);

    return this.authService.loginUser(loginInfo);
  }

  @Post('test')
  testAccess() {}
}
