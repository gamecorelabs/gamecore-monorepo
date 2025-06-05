import { CreateUserAccountDto } from '@_core/base-user/dto/create-user-account.dto';
import { ENV_HASH_ROUNDS } from '@_core/base-common/const/env-keys.const';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrpyt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { BaseUserService } from '@_core/base-user/base-user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly baseUserService: BaseUserService,
  ) {}

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
}
