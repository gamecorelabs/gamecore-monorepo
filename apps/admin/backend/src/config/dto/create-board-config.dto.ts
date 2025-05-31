import { PickType } from '@nestjs/mapped-types';
import { BoardConfig } from '../entity/board-config';

export class CreateBoardConfigDto extends PickType(BoardConfig, [
  'domain',
  'table_name',
  'board_name',
  'description',
  'status',
]) {}
