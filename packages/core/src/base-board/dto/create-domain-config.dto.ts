import { PickType } from "@nestjs/mapped-types";
import { DomainConfig } from "@_core/base-common/entity/domain-config";

export class CreateDomainConfigDto extends PickType(DomainConfig, [
  "category",
  "domain",
  "title",
  "status",
]) {}
