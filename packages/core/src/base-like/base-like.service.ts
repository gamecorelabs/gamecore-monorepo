import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Repository } from "typeorm";
import { UserOrGuestLoginRequest } from "@_core/base-user/types/user.types";
import { getUserInfo } from "@_core/base-user/util/get-user-info.util";
import { ENV_HASH_ROUNDS } from "@_core/base-common/const/env-keys.const";
import { CreateLikeDto } from "./dto/create-like.dto";
import { Like } from "./entity/like.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class BaseLikeService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
    private readonly configService: ConfigService
  ) {}

  async saveLike(
    dto: CreateLikeDto,
    user: UserOrGuestLoginRequest
  ): Promise<Like> {
    const userInfo = await getUserInfo(
      user,
      parseInt(this.configService.get<string>(ENV_HASH_ROUNDS) as string)
    );

    const like = this.likeRepository.create({
      ...dto,
      ...userInfo,
      ip_address: user.ip_address,
    });

    return this.likeRepository.save(like);
  }
}
