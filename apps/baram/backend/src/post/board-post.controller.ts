import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { PostService } from "./post.service";
import { GuestOrUserTokenGuard } from "@_core/base-auth/guard/guest-or-user-token.guard";
import { CurrentUser } from "@_core/base-user/decorator/current-user.decorator";
import { RequestCreateBoardPostDto } from "@_core/base-post/board/dto/create-board-post.dto";
import { BoardExistsPipe } from "@_core/base-board/pipe/board-exists.pipe";
import { UserOrGuestLoginRequest } from "@_core/base-user/types/user.types";
import { BoardConfig } from "@_core/base-board/entity/board-config.entity";
import { BoardPostService } from "@_core/base-post/board/board-post.service";
import { BaseLikeService } from "@_core/base-like/base-like.service";
import {
  BoardPostRequest,
  CommonRequest,
} from "@_core/base-common/types/resource-types";
import { ResourceExistenceGuard } from "@_core/base-common/guard/resource-existence.guard";
import { CreateRequestLikeDto } from "@_core/base-like/dto/create-like.dto";
import { RequestCreateCommentDto } from "@_core/base-comment/dto/create-comment.dto";
import { BaseCommentService } from "@_core/base-comment/base-comment.service";

@Controller(["board-post"])
export class BoardPostController {
  constructor(
    private readonly postService: PostService,
    private readonly boardPostService: BoardPostService,
    private readonly baseLikeService: BaseLikeService,
    private readonly baseCommentService: BaseCommentService
  ) {}

  // 특정 게시글 댓글 저장
  @Post(":id/comment")
  @UseGuards(ResourceExistenceGuard)
  @UseGuards(GuestOrUserTokenGuard)
  postComment(
    @Request() req: BoardPostRequest,
    @CurrentUser() user: UserOrGuestLoginRequest,
    @Body() body: RequestCreateCommentDto
  ) {
    const dto = {
      resource_info: req.resource_info,
      ...body,
    };

    return this.baseCommentService.saveComment(dto, user);
  }

  // 특정 게시글 좋아요
  @Post(":id/like")
  @UseGuards(ResourceExistenceGuard)
  @UseGuards(GuestOrUserTokenGuard)
  async toggleLike(
    @Request() req: CommonRequest,
    @CurrentUser() user: UserOrGuestLoginRequest,
    @Body() body: CreateRequestLikeDto
  ) {
    const dto = {
      ...body,
      resource_info: req.resource_info,
    };

    return this.baseLikeService.toggleLike(dto, user);
  }
}
