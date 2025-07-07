import { ResourceType } from "@_core/base-common/enum/common.enum";
import { IsNumber, IsString } from "class-validator";

export class SelectedLikeDto {
  @IsString()
  resource_type: ResourceType;

  @IsNumber({}, { each: true })
  resource_ids: number[];
}
