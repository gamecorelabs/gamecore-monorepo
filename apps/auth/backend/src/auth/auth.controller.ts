import {
  Body,
  Controller,
  Headers,
  Post,
  Request,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserAccountDto } from '@_core/base-user/dto/create-user-account.dto';
import { BaseAuthService } from '@_core/base-auth/base-auth.service';
import { BasicUserTokenGuard } from '@_core/base-auth/guard/basic-user-token.guard';
import { Request as ExpressRequest, Response } from 'express';
import { UserAccount } from '@_core/base-user/entity/user-account.entity';

interface LoginRequest extends ExpressRequest {
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
  @UseGuards(BasicUserTokenGuard)
  async loginUser(
    @Request() req: LoginRequest,
    @Res({ passthrough: true }) res: Response,
    @Body('test') test: string,
  ) {
    const tokenData = await this.authService.loginUser(req.loginInfo);

    if (test === 'postman') {
      return tokenData;
    }
    await this.authService.setTokenCookie(res, tokenData);
  }
}
