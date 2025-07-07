import { BadRequestException, Injectable } from "@nestjs/common";
import { BaseModel } from "../entity/base.entity";
import {
  FindManyOptions,
  FindOptionsOrder,
  FindOptionsWhere,
  Repository,
} from "typeorm";
import { FILTER_MAPPER } from "../const/filter-mapper.const";
import { BasePaginationDto } from "../dto/base-pagination.dto";

@Injectable()
export class CommonPaginateService {
  async pagePaginate<T extends BaseModel>(
    dto: BasePaginationDto,
    repository: Repository<T>,
    overrideFindOptions: FindManyOptions<T> = {}
  ): Promise<{
    data: T[];
    total: number;
  }> {
    const findOptions = this.composeFindOptions<T>(dto);

    const mergedOptions: FindManyOptions<T> = {
      ...findOptions,
      ...overrideFindOptions,
    };

    if (findOptions.where && overrideFindOptions.where) {
      mergedOptions.where = {
        ...findOptions.where,
        ...overrideFindOptions.where,
      };
    }

    const [data, count] = await repository.findAndCount(mergedOptions);

    return {
      data,
      total: count,
    };
  }

  private composeFindOptions<T extends BaseModel>(
    dto: BasePaginationDto
  ): FindManyOptions<T> {
    /**
     * where,
     * order,
     * take,
     * skip -> page 기반일때만
     */

    let where: FindOptionsWhere<T> = {};
    let order: FindOptionsOrder<T> = {};

    for (const [key, value] of Object.entries(dto)) {
      if (value) {
        if (key.startsWith("where__")) {
          where = {
            ...where,
            ...this.parseWhereFilter(key, value),
          };
        } else if (key.startsWith("order__")) {
          order = {
            ...order,
            ...this.parseWhereFilter(key, value),
          };
        }
      }
    }

    return {
      where,
      order,
      take: dto.take,
      skip: dto.page ? ((dto.page ?? 1) - 1) * dto.take : 0,
    };
  }

  private parseWhereFilter<T extends BaseModel>(
    key: string,
    value: any
  ): FindOptionsWhere<T> | FindOptionsOrder<T> {
    const options: FindOptionsWhere<T> | FindOptionsOrder<T> = {};

    const split = key.split("__");

    if (split.length === 2) {
      // 조건/정렬, 필드명 구조
      // ex) where__id
      const [_, field] = split; // where, id

      options[field] = value;
    } else if (split.length === 3) {
      /**
       * 조건/정렬, 필드명, 필터 구조
       * FILTER_MAPPER에 미리 정의해둔 값들 이용
       */

      // ex) where__id__more_than
      const [_, field, operator] = split; // where, id, more_than
      if (!FILTER_MAPPER[operator]) {
        throw new BadRequestException(`지원하지 않는 필터입니다. - ${key}`);
      }

      // where__id__between = 3,4와 같이 value를 두 개 이상 요구하는 경우를 대비
      // NOTE: 복잡한 쿼리가 요구되면서 이런 경우가 다양해지면 별도로 분리하는게 좋을 것 같다.
      const values = value?.toString().includes(",") //
        ? value.toString().split(",")
        : value;

      if (operator === "between") {
        // between 예외처리
        options[field] = FILTER_MAPPER[operator](values[0], values[1]);
      } else {
        if (operator === "like") {
          options[field] = FILTER_MAPPER[operator](`%${values}%`);
        } else {
          options[field] = FILTER_MAPPER[operator](values);
        }
      }
    } else {
      throw new BadRequestException(
        `where 필터는 split시 길이가 2 또는 3이여야 합니다. - 문제되는 키값 ${key}`
      );
    }
    return options;
  }
}
