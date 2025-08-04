import { CommonRequest } from "@base-common/types/request-types";
import { NewsConfig } from "../entity/news-config.entity";

export type NewsConfigRequest = CommonRequest & { newsConfig: NewsConfig };
