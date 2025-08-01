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
import {
  GuestOrUserTokenGuard,
  CurrentUser,
  BaseCommentService,
  ResourceExistenceGuard,
  CreateRequestLikeDto,
  BaseLikeService,
  CurrentQueryRunner,
  QueryRunnerTransactionInterceptor,
} from "@gamecorelabs/nestjs-core";
import * as UserRequestTypes from "@gamecorelabs/nestjs-core";
import * as CommonRequestTypes from "@gamecorelabs/nestjs-core";
import * as CommentRequestTypes from "@gamecorelabs/nestjs-core";
import { QueryRunner } from "typeorm";

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
      resourceInfo: req.resourceInfo,
    };

    return this.baseLikeService.toggleLike(dto, user, qr);
  }
}
