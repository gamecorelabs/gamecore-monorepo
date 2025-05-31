import { Controller } from "@nestjs/common";
import { BasePostService } from "./base-post.service";

@Controller("post")
export class BasePostController {
  constructor(private readonly basePostService: BasePostService) {}
}
