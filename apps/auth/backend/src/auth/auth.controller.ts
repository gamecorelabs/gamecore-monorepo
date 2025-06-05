import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserAccountDto } from '@_core/base-user/dto/create-user-account.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(@Body() dto: CreateUserAccountDto) {
    return await this.authService.registerUser(dto);
  }
}
