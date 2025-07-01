import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Repository } from "typeorm";
import { UserOrGuestLoginRequest } from "@_core/base-user/types/user.types";
import { getUserInfo } from "@_core/base-user/util/get-user-info.util";
import { ENV_HASH_ROUNDS } from "@_core/base-common/const/env-keys.const";
import { CreateLikeDto } from "./dto/create-like.dto";
import { Like } from "./entity/like.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { LikeStatus, LikeType } from "./enum/like.enum";
import { UpdateLikeDto } from "./dto/update-like.dto";
import { ResourceType } from "@_core/base-common/enum/common.enum";

@Injectable()
export class BaseLikeService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
    private readonly configService: ConfigService
  ) {}

  async getLikeCountByResource(
    resource_type: ResourceType,
    resource_id: number
  ) {
    const counts = await this.likeRepository
      .createQueryBuilder("like")
      .select("type")
      .addSelect("COUNT(*)", "count")
      .where("resource_type = :resource_type", {
        resource_type,
      })
      .where("status", {
        status: LikeStatus.SELECTED,
      })
      .andWhere("resource_id = :resource_id", {
        resource_id: resource_id,
      })
      .groupBy("type")
      .getRawMany();

    if (!counts || counts.length === 0) {
      return {};
    }

    return counts.reduce((acc, cur) => {
      let key: string;

      switch (cur.type) {
        case LikeType.LIKE:
          key = "likeCount";
          break;
        case LikeType.DISLIKE:
          key = "dislikeCount";
          break;
        default:
          key = String(cur.type);
      }
      acc[key] = parseInt(cur.count, 10);
      return acc;
    }, {});
  }

  async toggleLike(dto: CreateLikeDto, user: UserOrGuestLoginRequest) {
    let conditions = {
      where: {
        resource_info: dto.resource_info,
        ip_address: user.ip_address,
      },
    };

    const user_id = user.type === "user" ? user.user_account.id : 0;

    if (user_id > 0) {
      conditions.where["author"]["id"] = user_id;
    }

    const existingLike = await this.likeRepository.findOne(conditions);

    // 이미 좋아요 또는 싫어요 한 내역이 있는 상태
    if (existingLike) {
      // 좋아요 또는 싫어요 상태가 선택된 상태인 경우
      if (existingLike.status === LikeStatus.SELECTED) {
        if (existingLike.type !== dto.type) {
          // 좋아요 타입이 서로 다른 경우 취소 후 다시 선택하게 유도
          return {
            message:
              "이미 좋아요 또는 싫어요를 한 상태입니다. 취소 후 다시 선택해주세요.",
            type: existingLike.type,
          };
        } else {
          // 좋아요 타입이 서로 같은 경우 취소 상태로 update
          return await this.updateLike(existingLike.id, {
            status: LikeStatus.CANCELED,
          });
        }
      } else {
        // 좋아요 또는 싫어요 내역은 있지만 선택하지 않았을 경우 선택으로 update
        return await this.updateLike(existingLike.id, {
          type: dto.type,
          status: LikeStatus.SELECTED, // 좋아요/싫어요 취소
        });
      }
    } else {
      // 좋아요 또는 싫어요 내역 자체가 없는 경우 새로 생성
      return this.saveLike(dto, user);
    }
  }

  protected async saveLike(
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

  protected async updateLike(
    id: number,
    update: UpdateLikeDto
  ): Promise<boolean> {
    const result = await this.likeRepository.update({ id }, update);

    return !!(
      result &&
      typeof result.affected === "number" &&
      result.affected > 0
    );
  }

  async getLikeCountByResourceInId(
    resource_type: ResourceType,
    idList: number[]
  ) {
    const rawCounts = await this.likeRepository
      .createQueryBuilder("like")
      .select("like.resource_id", "resource_id")
      .addSelect([
        `COUNT(CASE WHEN like.type = :likeType THEN 1 END) AS likeCount`,
        `COUNT(CASE WHEN like.type = :dislikeType THEN 1 END) AS dislikeCount`,
      ])
      .where("like.resource_type = :resourceType", {
        resourceType: resource_type,
      })
      .andWhere("like.resource_id IN (:...idList)", { idList })
      .andWhere("like.status = :status", {
        status: LikeStatus.SELECTED,
      })
      .groupBy("like.resource_id")
      .setParameters({
        likeType: LikeType.LIKE,
        dislikeType: LikeType.DISLIKE,
      })
      .getRawMany();

    const likeCounts: Record<
      number,
      { likeCount: number; dislikeCount: number }
    > = rawCounts.reduce((acc, row) => {
      acc[row.resource_id] = {
        likeCount: parseInt(row.likeCount, 10),
        dislikeCount: parseInt(row.dislikeCount, 10),
      };
      return acc;
    }, {});

    return likeCounts;
  }
}
