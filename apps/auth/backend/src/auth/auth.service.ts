import { CreateUserAccountDto } from '@_core/base-user/dto/create-user-account.dto';
import { ENV_HASH_ROUNDS } from '@_core/base-common/const/env-keys.const';
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrpyt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { BaseUserService } from '@_core/base-user/base-user.service';
import { UserAccount } from '@_core/base-user/entity/user-account.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly baseUserService: BaseUserService,
  ) {}

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

    return existsUser;
  }

  async registerUser(dto: CreateUserAccountDto) {
    const hash = await bcrpyt.hash(
      dto.password,
      parseInt(this.configService.get<string>(ENV_HASH_ROUNDS) as string),
    );

    const newUser = await this.baseUserService.saveUser({
      ...dto,
      password: hash,
    });

    // TODO: 토큰 발급
    return newUser;
  }

  extractToken(authHeader: string): string {
    const prefix = ['Bearer', 'Basic'];
    const splitHeader = authHeader.split(' ');

    if (splitHeader.length !== 2 || !prefix.includes(splitHeader[0])) {
      throw new UnauthorizedException('토큰이 잘못되었습니다.');
    }

    const token = splitHeader[1];

    return token;
  }

  decodeBasicToken(token: string) {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const splitDecoded = decoded.split(':');

    if (splitDecoded.length !== 2) {
      throw new UnauthorizedException('잘못된 유형의 토큰입니다.');
    }

    const [email, password] = splitDecoded;

    return {
      email,
      password,
    };
  }
}
