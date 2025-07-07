import { IsIn, IsNumber, IsOptional } from "class-validator";

/**
 * Base Pagination DTO
 * 각 resource에서 extends 하여 사용 권장
 */
export class BasePaginationDto {
  @IsNumber()
  @IsOptional()
  page?: number;

  @IsNumber()
  @IsOptional()
  where__id__more_than?: number;

  @IsNumber()
  @IsOptional()
  where__id__less_than?: number;

  // 생성시간 기준 정렬
  @IsIn(["ASC", "DESC", "asc", "desc"])
  @IsOptional()
  order__created_at?: "ASC" | "DESC" | "asc" | "desc" = "DESC";

  @IsNumber()
  @IsOptional()
  take: number = 10;
}
