import { CommonRequest } from "@gamecoregg/nestjs-core/base-common/types/request-types";
import { BoardConfig } from "@gamecoregg/nestjs-core/base-board/entity/board-config.entity";

export type BoardConfigRequest = CommonRequest & { boardConfig: BoardConfig };
