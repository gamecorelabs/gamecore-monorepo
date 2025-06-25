import {
  Body,
  Controller,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserAccountDto } from '@_core/base-user/dto/create-user-account.dto';
import { BaseAuthService } from '@_core/base-auth/base-auth.service';
import { BasicUserTokenGuard } from '@_core/base-auth/guard/basic-user-token.guard';
import { RefreshTokenGuard } from '@_core/base-auth/guard/refresh-token.guard';
import { AccessTokenGuard } from '@_core/base-auth/guard/access-token.guard';
import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import { UserAccount } from '@_core/base-user/entity/user-account.entity';
import { UserLoginRequest } from '@_core/base-user/types/user.types';
import { CurrentUser } from '@_core/base-user/decorator/current-user.decorator';

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
    @CurrentUser() user: UserLoginRequest,
    @Res({ passthrough: true }) res: ExpressResponse,
  ) {
    const tokenData = this.baseAuthService.getIssuanceToken(
      user.user_account,
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
  async getMe(@CurrentUser() user: UserLoginRequest) {
    return user;
  }
}
