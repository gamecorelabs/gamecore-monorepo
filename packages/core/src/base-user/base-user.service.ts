import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserAccount } from "@_core/base-user/entity/user-account.entity";
import { CreateUserAccountDto } from "./dto/create-user-account.dto";

@Injectable()
export class BaseUserService {
  constructor(
    @InjectRepository(UserAccount)
    private readonly userAccountRepository: Repository<UserAccount>
  ) {}

  async saveUser(dto: CreateUserAccountDto) {
    try {
      const passExists = await this.userExists(dto);

      if (passExists) {
        return await this.userAccountRepository.save(dto);
      }
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to save user: ${error.message}`
      );
    }
  }

  async userExists(
    user: Pick<UserAccount, "nickname" | "email" | "password">
  ): Promise<boolean> {
    const nicknameExist = await this.userAccountRepository.exists({
      where: { nickname: user.nickname },
    });

    if (nicknameExist) {
      throw new BadRequestException("닉네임이 이미 존재합니다.");
    }

    const emailExist = await this.userAccountRepository.exists({
      where: { email: user.email },
    });

    if (emailExist) {
      throw new BadRequestException("이메일이 중복 되었습니다.");
    }

    return true;
  }
}
