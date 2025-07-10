import { CommonRequest } from "@base-common/types/request-types";
import { BoardConfig } from "@base-board/entity/board-config.entity";

export type BoardConfigRequest = CommonRequest & { boardConfig: BoardConfig };
