import {
  Body,
  Controller,
  Headers,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserAccountDto } from '@_core/base-user/dto/create-user-account.dto';
import { BaseAuthService } from '@_core/base-auth/base-auth.service';
import { BasicTokenGuard } from '@_core/base-auth/guard/basic-token.guard';
import { Request as ExpressRequest } from 'express';
import { UserAccount } from '@_core/base-user/entity/user-account.entity';

interface BoardPostRequest extends ExpressRequest {
  loginInfo: Pick<UserAccount, 'email' | 'password'>;
}
interface Requeset {}
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
  @UseGuards(BasicTokenGuard)
  async loginUser(@Request() req: BoardPostRequest) {
    return this.authService.loginUser(req.loginInfo);
  }

  @Post('test')
  testAccess() {}
}
