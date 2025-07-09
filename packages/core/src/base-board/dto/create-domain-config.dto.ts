import { PickType } from "@nestjs/mapped-types";
import { DomainConfig } from "@gamecoregg/nestjs-core/base-domain/entity/domain-config.entity";

export class CreateDomainConfigDto extends PickType(DomainConfig, [
  "category",
  "domain",
  "title",
  "status",
]) {}
