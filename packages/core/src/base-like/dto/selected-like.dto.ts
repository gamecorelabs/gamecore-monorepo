import { ResourceType } from "@_core/base-common/enum/common.enum";
import { IsNumber, IsString } from "class-validator";

export class SelectedLikeDto {
  @IsString()
  resource_type: ResourceType;
  @IsNumber()
  resource_ids: number[];
}
