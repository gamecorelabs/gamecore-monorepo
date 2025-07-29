import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { PostService } from "./post.service";
import {
  GuestOrUserTokenGuard,
  CurrentUser,
  BoardPostService,
  BaseLikeService,
  ResourceExistenceGuard,
  CreateRequestLikeDto,
  RequestCreateCommentDto,
  UpdateBoardPostDto,
  BaseCommentService,
  QueryRunnerTransactionInterceptor,
  CurrentQueryRunner
} from "@gamecorelabs/nestjs-core";
import * as UserRequestTypes from "@gamecorelabs/nestjs-core";
import * as CommonRequestTypes from "@gamecorelabs/nestjs-core";
import * as BoardRequestTypes from "@gamecorelabs/nestjs-core";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import { QueryRunner } from "typeorm";

@Controller(["board-post"])
export class BoardPostController {
  constructor(
    private readonly postService: PostService,
    private readonly boardPostService: BoardPostService,
    private readonly baseLikeService: BaseLikeService,
    private readonly baseCommentService: BaseCommentService
  ) {}

  // 게시글 상세히 보기
  @Get(":id")
  @UseGuards(ResourceExistenceGuard)
  getPostDetail(
    @Request() req: CommonRequestTypes.CommonRequest,
    @Param("id", ParseIntPipe) id: number
  ) {
    return this.boardPostService.getPostDetail(id);
  }

  @Patch(":id")
  @UseGuards(ResourceExistenceGuard)
  @UseGuards(GuestOrUserTokenGuard)
  @UseInterceptors(AnyFilesInterceptor())
  async patchPost(
    @Param("id", ParseIntPipe) id: number,
    @CurrentUser() user: UserRequestTypes.UserOrGuestLoginRequest,
    @Body() body: UpdateBoardPostDto
  ) {
    await this.boardPostService.checkOwnerPost(id, user);
    return this.boardPostService.updatePost(id, body);
  }

  @Delete(":id")
  @UseGuards(ResourceExistenceGuard)
  @UseGuards(GuestOrUserTokenGuard)
  async deletePost(
    @Param("id", ParseIntPipe) id: number,
    @CurrentUser() user: UserRequestTypes.UserOrGuestLoginRequest
  ) {
    await this.boardPostService.checkOwnerPost(id, user);
    return this.boardPostService.deletePost(id);
  }

  // 특정 게시글의 댓글 리스트
  @Get(":id/comments")
  @UseGuards(ResourceExistenceGuard)
  async getCommentsByPostId(
    @Request() req: CommonRequestTypes.CommonRequest,
    @Param("id", ParseIntPipe) id: number
  ) {
    return await this.baseCommentService.getPostCommentList(
      req.resource_info.resource_type,
      req.resource_info.resource_id
    );
  }

  // 특정 게시글 댓글 저장
  @Post(":id/comment")
  @UseGuards(ResourceExistenceGuard)
  @UseGuards(GuestOrUserTokenGuard)
  @UseInterceptors(QueryRunnerTransactionInterceptor)
  postComment(
    @Request() req: BoardRequestTypes.BoardPostRequest,
    @CurrentUser() user: UserRequestTypes.UserOrGuestLoginRequest,
    @CurrentQueryRunner() qr: QueryRunner,
    @Body() body: RequestCreateCommentDto
  ) {
    const dto = {
      resource_info: req.resource_info,
      ...body,
    };

    return this.baseCommentService.saveComment(dto, user, qr);
  }

  // 특정 게시글 좋아요
  @Post(":id/like")
  @UseGuards(ResourceExistenceGuard)
  @UseGuards(GuestOrUserTokenGuard)
  @UseInterceptors(QueryRunnerTransactionInterceptor)
  async toggleLike(
    @Request() req: CommonRequestTypes.CommonRequest,
    @CurrentUser() user: UserRequestTypes.UserOrGuestLoginRequest,
    @CurrentQueryRunner() qr: QueryRunner,
    @Body() body: CreateRequestLikeDto
  ) {
    const dto = {
      ...body,
      resource_info: req.resource_info,
    };

    return this.baseLikeService.toggleLike(dto, user, qr);
  }

  @Get(":id/owner-check")
  @UseGuards(ResourceExistenceGuard)
  @UseGuards(GuestOrUserTokenGuard)
  async getOwnerCheck(
    @Request() req: CommonRequestTypes.CommonRequest,
    @CurrentUser() user: UserRequestTypes.UserOrGuestLoginRequest,
    @Param("id", ParseIntPipe) id: number
  ) {
    return this.boardPostService.checkOwnerPost(id, user);
  }
}
