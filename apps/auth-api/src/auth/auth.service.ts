import { BaseAuthService } from '@gamecorelabs/nestjs-core/base-auth/base-auth.service';
import { TOKEN_EXPIRE } from '@gamecorelabs/nestjs-core/base-auth/const/auth.const';
import { ENV_HASH_ROUNDS } from '@gamecorelabs/nestjs-core/base-common/const/env-keys.const';
import { BaseUserService } from '@gamecorelabs/nestjs-core/base-user/base-user.service';
import { CreateUserAccountDto } from '@gamecorelabs/nestjs-core/base-user/dto/create-user-account.dto';
import { UserAccount } from '@gamecorelabs/nestjs-core/base-user/entity/user-account.entity';
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrpyt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly baseUserService: BaseUserService,
    private readonly baseAuthService: BaseAuthService,
    private readonly configService: ConfigService,
  ) {}

  // 로그인
  async loginUser(loginInfo: Pick<UserAccount, 'email' | 'password'>) {
    const existsUser = await this.baseUserService.getUserByEmail(
      loginInfo.email,
    );

    if (!existsUser) {
      throw new UnauthorizedException('존재하지 않는 사용자입니다.');
    }

    const isPasswordValid = await bcrpyt.compare(
      loginInfo.password,
      existsUser.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }

    // 토큰 재발급
    return this.baseAuthService.getIssuanceToken(existsUser);
  }

  // 회원가입
  async registerUser(dto: CreateUserAccountDto) {
    const hash = await bcrpyt.hash(
      dto.password,
      parseInt(this.configService.get<string>(ENV_HASH_ROUNDS) as string),
    );

    const newUser = await this.baseUserService.saveUser({
      ...dto,
      password: hash,
    });

    if (!newUser) {
      throw new InternalServerErrorException('사용자 등록에 실패했습니다.');
    }

    // 토큰 발급
    return this.baseAuthService.getIssuanceToken(newUser);
  }
}
