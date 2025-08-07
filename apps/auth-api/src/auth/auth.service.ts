import {
  BaseAuthService,
  ENV_HASH_ROUNDS,
  BaseUserService,
  CreateUserAccountDto,
  UserAccount,
  ProviderType,
  ENV_DISCORD_REDIRECT_URI,
  ENV_DISCORD_CLIENT_ID,
  ENV_FRONTEND_URL,
  ENV_DISCORD_CLIENT_SECRET,
} from '@gamecorelabs/nestjs-core';
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrpyt from 'bcrypt';
import axios from 'axios';

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

  // 디스코드 로그인 리다이렉트 URL 생성
  discordRedirect(returnUrl?: string): string {
    const { DISCORD_REDIRECT_URI, DISCORD_CLIENT_ID } =
      this.getDiscordConfigEnv();

    const state = returnUrl ? encodeURIComponent(returnUrl) : '';
    const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(DISCORD_REDIRECT_URI)}&response_type=code&scope=email+identify&state=${state}`;
    return discordAuthUrl;
  }

  // 디스코드 로그인 & 회원가입
  async discordLogin(code: string) {
    const { DISCORD_REDIRECT_URI, DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET } =
      this.getDiscordConfigEnv();

    // 1. Authorization code로 access token 교환
    const tokenResponse = await axios.post(
      'https://discord.com/api/oauth2/token',
      new URLSearchParams({
        client_id: DISCORD_CLIENT_ID,
        client_secret: DISCORD_CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: DISCORD_REDIRECT_URI,
      }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      },
    );

    const { access_token } = tokenResponse.data;

    // 2. Access token으로 사용자 정보 조회
    const userResponse = await axios.get('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const discordUser = userResponse.data;

    // 3. 사용자 계정 찾기 또는 생성
    let user = await this.baseUserService.getUserByEmail(discordUser.email);
    let newUser: UserAccount | undefined;

    if (user) {
      // 이미 해당 이메일의 유저는 존재하나, providerId가 없으면 업데이트
      if (!user.providerId) {
        user.providerId = discordUser.id;
        newUser = await this.baseUserService.saveUser(user);
      }
    } else {
      // 중복되지 않는 닉네임 생성
      const uniqueNickname = await this.generateUniqueNickname();

      newUser = await this.baseUserService.saveUser({
        email: discordUser.email,
        nickname: uniqueNickname,
        providerType: ProviderType.DISCORD,
        providerId: discordUser.id,
      });
    }

    const tokenUser = newUser || user;

    if (!tokenUser) {
      throw new InternalServerErrorException(
        '디스코드 로그인 사용자 인증에 실패했습니다.',
      );
    }

    // 4. JWT 토큰 생성
    return this.baseAuthService.getIssuanceToken(tokenUser);
  }

  // 중복되지 않는 랜덤 닉네임 생성
  private async generateUniqueNickname(): Promise<string> {
    // 최대 3번만 시도하여 DB 커넥션 최소화
    for (let attempt = 0; attempt < 3; attempt++) {
      const nickname = this.generateRandomNickname();

      // 중복 체크
      const exists = await this.baseUserService.checkNicknameExists(nickname);
      if (!exists) {
        return nickname;
      }
    }

    // 3번 실패시 타임스탬프 포함하여 확실히 유니크하게
    return `임시${Date.now()}`.substring(0, 8);
  }

  // 랜덤 닉네임 생성 (형용사 + 명사 + 숫자 조합)
  private generateRandomNickname(): string {
    const adjectives = [
      '멋진',
      '빠른',
      '용감한',
      '똑똑한',
      '친절한',
      '신비한',
      '야생의',
      '차분한',
      '대담한',
      '밝은',
      '재미난',
      '행운의',
      '마법의',
      '강한',
      '따뜻한',
      '시원한',
    ];

    const nouns = [
      '늑대',
      '독수리',
      '호랑이',
      '용',
      '사자',
      '여우',
      '곰',
      '상어',
      '기사',
      '마법사',
      '사냥꾼',
      '전사',
      '수호자',
      '영웅',
      '별',
      '달',
    ];

    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const number = Math.floor(Math.random() * 99) + 1; // 2자리 숫자로 제한

    const nickname = `${adjective}${noun}${number}`;

    // 8글자 이내로 자르기
    return nickname.length > 8 ? nickname.substring(0, 8) : nickname;
  }

  getDiscordConfigEnv() {
    const DISCORD_REDIRECT_URI = this.configService.get<string>(
      ENV_DISCORD_REDIRECT_URI,
    ) as string;
    const DISCORD_CLIENT_ID = this.configService.get<string>(
      ENV_DISCORD_CLIENT_ID,
    ) as string;
    const DISCORD_CLIENT_SECRET = this.configService.get<string>(
      ENV_DISCORD_CLIENT_SECRET,
    ) as string;
    const FRONTEND_URL = this.configService.get<string>(
      ENV_FRONTEND_URL,
    ) as string;

    return {
      DISCORD_REDIRECT_URI,
      DISCORD_CLIENT_ID,
      FRONTEND_URL,
      DISCORD_CLIENT_SECRET,
    };
  }
}
