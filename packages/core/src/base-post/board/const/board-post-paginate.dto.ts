import { IsNumber, IsOptional } from "class-validator";
import { BasePaginationDto } from "@_core/base-common/dto/base-pagination.dto";

export class BoardPostPaginateDto extends BasePaginationDto {
  @IsNumber()
  @IsOptional()
  take: number = 20;
}
