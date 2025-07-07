import { BadRequestException, Injectable } from "@nestjs/common";
import { BaseModel } from "./entity/base.entity";
import { FindManyOptions, Repository } from "typeorm";
import { BasePaginationDto } from "./dto/base-pagination.dto";
import { CommonPaginateService } from "./service/common-paginate.service";

@Injectable()
export class BaseCommonService {
  constructor(private readonly commonPaginateService: CommonPaginateService) {}
  paginate<T extends BaseModel>(
    dto: BasePaginationDto,
    repository: Repository<T>,
    overrideFindOptions: FindManyOptions<T> = {}
  ) {
    return this.commonPaginateService.pagePaginate(
      dto,
      repository,
      overrideFindOptions
    );
  }
}
