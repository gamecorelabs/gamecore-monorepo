import {
  ConflictException,
  UnauthorizedException,
  Injectable,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Repository, In, QueryRunner } from "typeorm";
import { UserOrGuestLoginRequest } from "@_core/base-user/types/user.types";
import { getUserInfo } from "@_core/base-user/util/get-user-info.util";
import { ENV_HASH_ROUNDS } from "@_core/base-common/const/env-keys.const";
import { CreateLikeDto } from "./dto/create-like.dto";
import { Like } from "./entity/like.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { LikeStatus, LikeType } from "./enum/like.enum";
import { UpdateLikeDto } from "./dto/update-like.dto";
import { ResourceType } from "@_core/base-common/enum/common.enum";
import { ResourceRepositoryService } from "@_core/base-common/service/resource-repository.service";
import { SelectedLikeDto } from "./dto/selected-like.dto";
import { CommonTransactionService } from "@_core/base-common/service/common-transaction.service";
@Injectable()
export class BaseLikeService {
  private readonly countFieldMap: Record<LikeType, string> = {
    [LikeType.LIKE]: "like_count",
    [LikeType.DISLIKE]: "dislike_count",
  };

  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
    private readonly configService: ConfigService,
    private readonly resourceRepositoryService: ResourceRepositoryService,
    private readonly commonTransactionService: CommonTransactionService
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

  private async refreshLikeCount(
    dto: CreateLikeDto,
    action: "increment" | "decrement",
    qr?: QueryRunner
  ): Promise<void> {
    const { resource_type, resource_id } = dto.resource_info;

    const repository =
      this.resourceRepositoryService.getRepository(resource_type);

    if (!repository) {
      throw new ConflictException(
        `지원하지 않는 리소스 타입입니다: ${resource_type}`
      );
    }
    const field = this.countFieldMap[dto.type];
    if (!field) {
      throw new ConflictException(
        `지원하지 않는 좋아요 타입입니다: ${dto.type}`
      );
    }
    const targetEntity = repository.metadata.target as new () => any;

    if (qr) {
      const manager = qr.manager.getRepository(targetEntity);
      await manager[action]({ id: resource_id }, field, 1);
    } else {
      await repository[action]({ id: resource_id }, field, 1);
    }
  }

  async toggleLike(
    dto: CreateLikeDto,
    user: UserOrGuestLoginRequest,
    qr?: QueryRunner
  ) {
    let conditions = {
      where: {
        resource_info: dto.resource_info,
      },
    };

    switch (user.type) {
      case "user":
        conditions.where["author"] = { id: user.user_account.id };
        break;
      case "fingerprint":
        conditions.where["fingerprint"] = user.fingerprint;
        break;
      default:
        throw new UnauthorizedException("식별할 수 없는 회원 타입입니다.");
    }

    const existingLike = await this.likeRepository.findOne(conditions);

    // // 이미 좋아요 또는 싫어요 한 내역이 있는 상태
    if (existingLike) {
      // 좋아요 또는 싫어요 상태가 선택된 상태인 경우
      if (existingLike.status === LikeStatus.SELECTED) {
        if (existingLike.type !== dto.type) {
          throw new ConflictException(
            "이미 좋아요 또는 싫어요를 한 상태입니다. 취소 후 다시 선택해주세요."
          );
        } else {
          // 좋아요 타입이 서로 같은 경우 취소 상태로 update
          await this.updateLike(
            existingLike.id,
            {
              status: LikeStatus.CANCELED,
            },
            qr
          );
          await this.refreshLikeCount(dto, "decrement", qr);

          return {
            canceled: true,
          };
        }
      } else {
        // 좋아요 또는 싫어요 내역은 있지만 선택하지 않았을 경우 선택으로 update
        await this.updateLike(
          existingLike.id,
          {
            type: dto.type,
            status: LikeStatus.SELECTED, // 좋아요/싫어요 취소
          },
          qr
        );
        await this.refreshLikeCount(dto, "increment", qr);

        return {
          selected: dto.type,
        };
      }
    } else {
      // 좋아요 또는 싫어요 내역 자체가 없는 경우 새로 생성
      const result = await this.saveLike(dto, user, qr);
      await this.refreshLikeCount(dto, "increment", qr);
      return {
        selected: result.type,
      };
    }
  }

  protected async saveLike(
    dto: CreateLikeDto,
    user: UserOrGuestLoginRequest,
    qr?: QueryRunner
  ): Promise<Like> {
    const userInfo = await getUserInfo(
      user,
      parseInt(this.configService.get<string>(ENV_HASH_ROUNDS) as string)
    );

    const manager = this.commonTransactionService.getManagerRepository<Like>(
      Like,
      this.likeRepository,
      qr
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
    update: UpdateLikeDto,
    qr?: QueryRunner
  ): Promise<boolean> {
    // const result = await this.likeRepository.update({ id }, update)
    const manager = this.commonTransactionService.getManagerRepository<Like>(
      Like,
      this.likeRepository,
      qr
    );

    const result = await manager.update({ id }, update);

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

  async checkUserLikeStatus(
    dto: SelectedLikeDto,
    user: UserOrGuestLoginRequest
  ): Promise<Record<number, { type: LikeType } | null>> {
    const { resource_type, resource_ids } = dto;
    const conditions = {
      where: {
        resource_info: {
          resource_type: resource_type,
          resource_id: In(resource_ids),
        },
        status: LikeStatus.SELECTED,
      },
    };

    switch (user.type) {
      case "user":
        conditions.where["author"] = { id: user.user_account.id };
        break;
      case "fingerprint":
        conditions.where["fingerprint"] = user.fingerprint;
        break;
      default:
        throw new UnauthorizedException("식별할 수 없는 회원 타입입니다.");
    }

    const results = await this.likeRepository.find(conditions);

    // 결과를 resource_id별로 매핑
    const likeStatusMap: Record<number, { type: LikeType } | null> = {};

    // 모든 요청된 ID를 null로 초기화
    resource_ids.forEach((id) => (likeStatusMap[id] = null));

    // 실제 결과로 업데이트
    results.forEach((like) => {
      likeStatusMap[like.resource_info.resource_id] = { type: like.type };
    });

    return likeStatusMap;
  }
}
