import { PickType } from "@nestjs/mapped-types";
import { Like } from "../entity/like.entity";

export class CreateLikeDto extends PickType(Like, [
  "resource_info",
  "is_liked",
]) {}
