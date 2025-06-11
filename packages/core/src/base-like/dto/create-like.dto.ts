import { PickType } from "@nestjs/mapped-types";
import { Like } from "../entity/like.entity";

export class CreateLikeDto extends PickType(Like, ["type", "resource_info"]) {}

export class CreateRequestLikeDto extends PickType(CreateLikeDto, ["type"]) {}
