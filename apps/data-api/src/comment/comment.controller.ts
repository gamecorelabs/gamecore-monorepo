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
  UseInterceptors,
} from "@nestjs/common";
import { CommentService } from "./comment.service";
import { GuestOrUserTokenGuard } from "@gamecorelabs/nestjs-core/base-auth/guard/guest-or-user-token.guard";
import { CurrentUser } from "@gamecorelabs/nestjs-core/base-user/decorator/current-user.decorator";
import { BaseCommentService } from "@gamecorelabs/nestjs-core/base-comment/base-comment.service";
import { ResourceExistenceGuard } from "@gamecorelabs/nestjs-core/base-common/guard/resource-existence.guard";
import * as UserRequestTypes from "@gamecorelabs/nestjs-core/base-user/types/user.types";
import * as CommonRequestTypes from "@gamecorelabs/nestjs-core/base-common/types/request-types";
import * as CommentRequestTypes from "@gamecorelabs/nestjs-core/base-comment/types/request-types";
import { CreateRequestLikeDto } from "@gamecorelabs/nestjs-core/base-like/dto/create-like.dto";
import { BaseLikeService } from "@gamecorelabs/nestjs-core/base-like/base-like.service";
import { QueryRunner } from "typeorm";
import { CurrentQueryRunner } from "@gamecorelabs/nestjs-core/base-common/decorator/current-query-runner.decorator";
import { QueryRunnerTransactionInterceptor } from "@gamecorelabs/nestjs-core/base-common/interceptor/query-runner-transaction.interceptor";

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
  @UseInterceptors(QueryRunnerTransactionInterceptor)
  async deleteComment(
    @Request() req: CommentRequestTypes.CommentRequest,
    @Param("id", ParseIntPipe) id: number,
    @CurrentUser() user: UserRequestTypes.UserOrGuestLoginRequest,
    @CurrentQueryRunner() qr: QueryRunner
  ) {
    await this.baseCommentService.checkOwnerComment(id, user);
    return this.baseCommentService.deleteComment(id, req, qr);
  }

  // 특정 댓글 좋아요/싫어요
  @Post(":id/like")
  @UseGuards(ResourceExistenceGuard)
  @UseGuards(GuestOrUserTokenGuard)
  @UseInterceptors(QueryRunnerTransactionInterceptor)
  async toggleLike(
    @Request() req: CommonRequestTypes.CommonRequest,
    @CurrentUser() user: UserRequestTypes.UserOrGuestLoginRequest,
    @Body() body: CreateRequestLikeDto,
    @CurrentQueryRunner() qr: QueryRunner
  ) {
    const dto = {
      ...body,
      resource_info: req.resource_info,
    };

    return this.baseLikeService.toggleLike(dto, user, qr);
  }
}
