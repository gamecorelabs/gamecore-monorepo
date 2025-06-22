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
import { RefreshTokenGuard } from '@_core/base-auth/guard/refresh-token.guard';
import { Request as ExpressRequest, Response } from 'express';
import { UserAccount } from '@_core/base-user/entity/user-account.entity';
import { UserLoginRequest } from '@_core/base-user/types/user.types';

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

  // access token 만료시 재발급
  @Post('token/access')
  @UseGuards(RefreshTokenGuard)
  async accessToken(
    @Request() req: UserLoginRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    // 토큰 재발급
    const tokenData = this.baseAuthService.getIssuanceToken(
      req.user_account,
      'access',
    );
    await this.authService.setTokenCookie(res, tokenData);
  }

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
