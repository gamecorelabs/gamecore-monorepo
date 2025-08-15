import { Controller } from "@nestjs/common";
import { PostService } from "./post.service";
import { BasePostService } from "@gamecorelabs/nestjs-core";

@Controller(["post"])
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly basePostService: BasePostService
  ) {}
}
