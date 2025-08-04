import { PickType } from "@nestjs/mapped-types";
import { NewsConfig } from "../entity/news-config.entity";

export class CreateNewsConfigDto extends PickType(NewsConfig, [
  "title",
  "description",
  "status",
]) {}
