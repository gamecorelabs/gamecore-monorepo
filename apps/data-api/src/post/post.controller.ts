import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from "@nestjs/common";
import { PostService } from "./post.service";
import { GuestOrUserTokenGuard } from "@gamecoregg/nestjs-core/base-auth/guard/guest-or-user-token.guard";
import { CurrentUser } from "@gamecoregg/nestjs-core/base-user/decorator/current-user.decorator";
import { RequestCreateBoardPostDto } from "@gamecoregg/nestjs-core/base-post/board/dto/create-board-post.dto";
import { BoardExistsPipe } from "@gamecoregg/nestjs-core/base-board/pipe/board-exists.pipe";
import { UserOrGuestLoginRequest } from "@gamecoregg/nestjs-core/base-user/types/user.types";
import { BoardConfig } from "@gamecoregg/nestjs-core/base-board/entity/board-config.entity";
import { BoardPostService } from "@gamecoregg/nestjs-core/base-post/board/board-post.service";

@Controller(["post"])
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly boardPostService: BoardPostService
  ) {}
}
