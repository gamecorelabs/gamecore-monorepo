import { CommonRequest } from "@_core/base-common/types/request-types";
import { BoardConfig } from "@_core/base-board/entity/board-config.entity";

export type BoardConfigRequest = CommonRequest & { boardConfig: BoardConfig };
