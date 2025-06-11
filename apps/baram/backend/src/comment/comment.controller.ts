import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { CommentService } from "./comment.service";
import { PostInBoardGuard } from "@_core/base-post/board/guard/post-in-board.guard";
import { GuestOrUserTokenGuard } from "@_core/base-auth/guard/guest-or-user-token.guard";
import { Request as ExpressRequest } from "express";
import { BoardPost } from "@_core/base-post/board/entity/board-post.entity";
import { BoardExistsPipe } from "@_core/base-board/pipe/board-exists.pipe";
import { BoardConfig } from "@_core/base-board/entity/board-config.entity";
import { UserOrGuestLoginRequest } from "@_core/base-user/types/user.types";
import { CurrentUser } from "@_core/base-user/decorator/current-user.decorator";
import { RequestCreateCommentDto } from "@_core/base-comment/dto/create-comment.dto";
import { ResourceType } from "@_core/base-common/enum/common.enum";
import { BaseCommentService } from "@_core/base-comment/base-comment.service";

// 분리 예정
interface BoardPostRequest extends ExpressRequest {
  boardPost: BoardPost;
}

@Controller("comment")
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly baseCommentService: BaseCommentService
  ) {}

  // FIXME: Resource에 따라 API path 공용화 체크
  // FIXME: 공용화시 Guards gateway 역할 필요
  @Post("/post/:id")
  @UseGuards(PostInBoardGuard)
  @UseGuards(GuestOrUserTokenGuard)
  postBoardComment(
    @Request() req: BoardPostRequest,
    @CurrentUser() user: UserOrGuestLoginRequest,
    @Body() body: RequestCreateCommentDto
  ) {
    const dto = {
      resource_info: {
        resource_type: ResourceType.POST,
        resource_id: req.boardPost.id,
      },
      ...body,
    };

    return this.baseCommentService.saveComment(dto, user);
  }
}
