import { IsString, IsNumber, IsOptional } from "class-validator";
import { BasePaginationDto } from "@gamecoregg/nestjs-core/base-common/dto/base-pagination.dto";

export class BoardPostPaginationDto extends BasePaginationDto {
  @IsNumber()
  @IsOptional()
  take: number = 5;

  @IsString()
  @IsOptional()
  where__title__like?: string;

  @IsString()
  @IsOptional()
  where__content__like?: string;
}
