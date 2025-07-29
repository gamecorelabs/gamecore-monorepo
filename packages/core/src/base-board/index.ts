// Module
export { BaseBoardModule } from './base-board.module';

// Service
export { BaseBoardService } from './base-board.service';

// DTOs
export { CreateBoardConfigDto } from './dto/create-board-config.dto';

// Entities
export { BoardCategory } from './entity/board-category.entity';
export { BoardConfig } from './entity/board-config.entity';

// Enums
export * from './enum/board-category.enum';
export * from './enum/board-config.enum';

// Guards
export { BoardExistsGuard } from './guard/board-exists.guard';

// Pipes
export { BoardExistsPipe } from './pipe/board-exists.pipe';

// Types
export * from './types/request-types';