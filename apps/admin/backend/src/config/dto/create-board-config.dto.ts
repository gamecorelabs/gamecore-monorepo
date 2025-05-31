import { IsOptional, IsString } from 'class-validator';
import { PickType } from '@nestjs/mapped-types';
import { BoardConfig } from '../entity/board-config';

// pick, omit, partial -> type을 반환
// PickType, OmitType, PartialType -> value를 반환

// export class CreatePostDto extends PickType(BoardConfig, [
//   'domain',
//   'type',
//   'table_name',
//   'board_name',
//   'description',
//   'is_public',
// ]) {}
