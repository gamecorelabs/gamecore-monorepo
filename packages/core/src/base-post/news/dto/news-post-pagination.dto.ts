import { IsString, IsNumber, IsOptional } from "class-validator";
import { BasePaginationDto } from "@base-common/dto/base-pagination.dto";

export class NewsPostPaginationDto extends BasePaginationDto {
  @IsNumber()
  @IsOptional()
  take: number = 5;

  @IsString()
  @IsOptional()
  where__title__like?: string;

  @IsString()
  @IsOptional()
  where__content__like?: string;

  @IsString()
  @IsOptional()
  or_where__title__like?: string;

  @IsString()
  @IsOptional()
  or_where__content__like?: string;
}

export class RequestNewsPostPaginationDto extends NewsPostPaginationDto {
  @IsNumber()
  @IsOptional()
  where__categoryId?: number;
}
