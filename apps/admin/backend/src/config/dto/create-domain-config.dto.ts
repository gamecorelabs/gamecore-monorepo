import { PickType } from '@nestjs/mapped-types';
import { DomainConfig } from '../entity/domain-config';

export class CreateDomainConfigDto extends PickType(DomainConfig, [
  'category',
  'domain',
  'name',
  'status',
]) {}
