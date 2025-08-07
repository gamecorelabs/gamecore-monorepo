import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserAccount } from "@base-user/entity/user-account.entity";
import { CreateUserAccountDto } from "./dto/create-user-account.dto";
import { CreateUserProfileDto } from "./dto/user-profile.dto";
import { UserLoginRequest } from "./types/user.types";

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
        `Failed to save user2: ${error.message}`
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

  async getUserByEmail(email: string): Promise<UserAccount | null> {
    const user = await this.userAccountRepository.findOne({
      where: { email },
    });

    return user;
  }

  async checkNicknameExists(nickname: string): Promise<boolean> {
    const user = await this.userAccountRepository.findOne({
      where: { nickname },
    });

    return !!user;
  }

  async updateProfile(dto: CreateUserProfileDto, user: UserLoginRequest) {
    try {
      if (user.type !== "user") {
        throw new BadRequestException(
          "사용자만 프로필을 업데이트 할 수 있습니다."
        );
      }

      let saveData: Partial<UserAccount> = {
        id: user.userAccount.id,
      };

      if (dto.nickname !== user.userAccount.nickname) {
        saveData.nickname = dto.nickname;
      }

      if (dto.profileImageFileName) {
        saveData.profileImage = dto.profileImageFileName;
      } else if (dto.isImageRemoved) {
        saveData.profileImage = "";
      }

      if (Object.keys(saveData).length === 1) {
        return true;
      }

      const updatedUser = await this.userAccountRepository.preload(saveData);

      if (!updatedUser) {
        throw new BadRequestException("사용자를 찾을 수 없습니다.");
      }

      await this.userAccountRepository.save(updatedUser);

      return true;
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw new InternalServerErrorException("프로필 업데이트에 실패했습니다.");
    }
  }
}
