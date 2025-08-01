import { PickType } from "@nestjs/mapped-types";
import { Like } from "../entity/like.entity";

export class CreateLikeDto extends PickType(Like, ["type", "resourceInfo"]) {}

export class CreateRequestLikeDto extends PickType(CreateLikeDto, ["type"]) {}
