import { IsString, IsNumber, IsOptional } from "class-validator";
import { BasePaginationDto } from "@base-common/dto/base-pagination.dto";
import { PickType } from "@nestjs/mapped-types";

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

export class RequestBoardPostPaginationDto extends PickType(
  BoardPostPaginationDto,
  ["take", "where__title__like", "where__content__like"]
) {
  @IsNumber()
  @IsOptional()
  where__categoryId?: number;
}
