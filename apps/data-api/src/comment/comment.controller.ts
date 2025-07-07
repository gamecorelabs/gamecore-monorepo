import {
  Body,
  Controller,
  Delete,
  InternalServerErrorException,
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
import { CommonRequest } from "@_core/base-common/types/request-types";
import { CommentRequest } from "@_core/base-comment/types/request-types";
import { CreateRequestLikeDto } from "@_core/base-like/dto/create-like.dto";
import { BaseLikeService } from "@_core/base-like/base-like.service";

@Controller("comment")
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly baseCommentService: BaseCommentService,
    private readonly baseLikeService: BaseLikeService
  ) {}

  // CONSIDER: 댓글 수정은 의도적으로 지원하지 않음. 추후 필요시 구현
  // @Patch(":id")

  // 댓글 삭제
  @Delete(":id")
  @UseGuards(ResourceExistenceGuard)
  @UseGuards(GuestOrUserTokenGuard)
  async deleteComment(
    @Request() req: CommentRequest,
    @Param("id", ParseIntPipe) id: number,
    @CurrentUser() user: UserOrGuestLoginRequest
  ) {
    await this.baseCommentService.checkOwnerComment(id, user);
    return this.baseCommentService.deleteComment(id, req);
  }

  // 특정 댓글 좋아요/싫어요
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
