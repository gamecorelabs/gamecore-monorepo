import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  CreateUserAccountDto,
  BaseAuthService,
  BasicUserTokenGuard,
  RefreshTokenGuard,
  AccessTokenGuard,
  UserAccount,
  CurrentUser,
  CsrfTokenProtectionGuard,
} from '@gamecorelabs/nestjs-core';
import * as userTypes from '@gamecorelabs/nestjs-core';
import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import { ConfigService } from '@nestjs/config';

interface LoginRequest extends ExpressRequest {
  loginInfo: Pick<UserAccount, 'email' | 'password'>;
}
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly baseAuthService: BaseAuthService,
  ) {}

  // access token 만료시 재발급
  @Post('token/access')
  @UseGuards(CsrfTokenProtectionGuard, RefreshTokenGuard)
  async accessToken(
    @CurrentUser() user: userTypes.UserLoginRequest,
    @Res({ passthrough: true }) res: ExpressResponse,
  ) {
    const tokenData = this.baseAuthService.getIssuanceToken(
      user.userAccount,
      'access',
    );
    return await this.baseAuthService.setTokenCookie(res, tokenData);
  }

  @Post('register')
  @UseGuards(CsrfTokenProtectionGuard)
  async registerUser(
    @Body() dto: CreateUserAccountDto,
    @Res({ passthrough: true }) res: ExpressResponse,
  ) {
    const tokenData = await this.authService.registerUser(dto);
    await this.baseAuthService.setTokenCookie(res, tokenData);
  }

  @Post('login')
  @UseGuards(CsrfTokenProtectionGuard, BasicUserTokenGuard)
  async loginUser(
    @Request() req: LoginRequest,
    @Res({ passthrough: true }) res: ExpressResponse,
    @Body('test') test: string,
  ) {
    const tokenData = await this.authService.loginUser(req.loginInfo);

    // FIXME: postman 테스트용
    if (test === 'postman') {
      return tokenData;
    }
    return await this.baseAuthService.setTokenCookie(res, tokenData);
  }

  @Post('logout')
  @UseGuards(CsrfTokenProtectionGuard)
  async logoutUser(@Res({ passthrough: true }) res: ExpressResponse) {
    // 후속 처리 여부에 따라 authService 추가 로직 작성 필요
    // await this.authService.logoutUser(res);

    return await this.baseAuthService.clearTokenCookie(res);
  }

  @Post('me')
  @UseGuards(CsrfTokenProtectionGuard, AccessTokenGuard)
  async getMe(@CurrentUser() user: userTypes.UserLoginRequest) {
    return user;
  }

  @Get('/csrf-token')
  async getCsrfToken(): Promise<string> {
    return await this.baseAuthService.getCsrfToken();
  }

  @Get('/discord')
  async discordLogin(
    @Query('returnUrl') returnUrl: string,
    @Res() res: ExpressResponse,
  ) {
    const discordAuthUrl = this.authService.discordRedirect(returnUrl);
    res.redirect(discordAuthUrl);
  }

  @Get('/discord/callback')
  async discordCallback(
    @Query('code') code: string,
    @Query('state') state: string,
    @Res({ passthrough: true }) res: ExpressResponse,
  ) {
    const { FRONTEND_URL } = this.authService.getDiscordConfigEnv();
    const tokenData = await this.authService.discordLogin(code);
    await this.baseAuthService.setTokenCookie(res, tokenData);

    const returnUrl = state
      ? decodeURIComponent(state)
      : FRONTEND_URL || 'https://gamecore.co.kr';
    res.redirect(returnUrl);
  }
}
