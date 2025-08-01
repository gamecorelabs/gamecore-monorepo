import { ResourceType } from "@base-common/enum/common.enum";
import { IsNumber, IsString } from "class-validator";

export class SelectedLikeDto {
  @IsString()
  resourceType: ResourceType;

  @IsNumber({}, { each: true })
  resourceIds: number[];
}
