import {
  Body,
  Controller,
  Headers,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserAccountDto } from '@_core/base-user/dto/create-user-account.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(@Body() dto: CreateUserAccountDto) {
    return await this.authService.registerUser(dto);
  }

  @Post('login')
  async loginUser(@Headers('Authorization') authHeader: string) {
    const token = this.authService.extractToken(authHeader);
    const loginInfo = this.authService.decodeBasicToken(token);

    return this.authService.loginUser(loginInfo);
  }
}
