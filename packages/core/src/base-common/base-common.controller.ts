import { Controller } from "@nestjs/common";
import { BaseCommonService } from "./base-common.service";

@Controller("common")
export class BaseCommonController {
  constructor(private readonly baseCommonService: BaseCommonService) {}
}
