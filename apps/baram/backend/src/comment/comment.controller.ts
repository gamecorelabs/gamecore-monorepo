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
import { GuestOrUserTokenGuard } from "@_core/base-auth/guard/guest-or-user-token.guard";
import { UserOrGuestLoginRequest } from "@_core/base-user/types/user.types";
import { CurrentUser } from "@_core/base-user/decorator/current-user.decorator";
import { RequestCreateCommentDto } from "@_core/base-comment/dto/create-comment.dto";
import { BaseCommentService } from "@_core/base-comment/base-comment.service";
import { ResourceExistenceGuard } from "@_core/base-common/guard/resource-existence.guard";
import { BoardPostRequest } from "@_core/base-common/types/resource-types";

@Controller(":resource_type/:resource_id/comment")
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly baseCommentService: BaseCommentService
  ) {}

  @Post()
  @UseGuards(ResourceExistenceGuard)
  @UseGuards(GuestOrUserTokenGuard)
  postBoardComment(
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
}
