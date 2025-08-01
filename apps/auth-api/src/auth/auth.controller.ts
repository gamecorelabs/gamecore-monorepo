import {
  Body,
  Controller,
  Post,
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
} from '@gamecorelabs/nestjs-core';
import * as userTypes from '@gamecorelabs/nestjs-core';
import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';

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
  @UseGuards(RefreshTokenGuard)
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
  async registerUser(
    @Body() dto: CreateUserAccountDto,
    @Res({ passthrough: true }) res: ExpressResponse,
  ) {
    const tokenData = await this.authService.registerUser(dto);
    await this.baseAuthService.setTokenCookie(res, tokenData);
  }

  @Post('login')
  @UseGuards(BasicUserTokenGuard)
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
  async logoutUser(@Res({ passthrough: true }) res: ExpressResponse) {
    // 후속 처리 여부에 따라 authService 추가 로직 작성 필요
    // await this.authService.logoutUser(res);

    return await this.baseAuthService.clearTokenCookie(res);
  }

  @Post('me')
  @UseGuards(AccessTokenGuard)
  async getMe(@CurrentUser() user: userTypes.UserLoginRequest) {
    return user;
  }
}
