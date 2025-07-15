import { Controller } from "@nestjs/common";
import { PostService } from "./post.service";
import { BoardPostService } from "@gamecorelabs/nestjs-core/base-post/board/board-post.service";

@Controller(["post"])
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly boardPostService: BoardPostService
  ) {}
}
