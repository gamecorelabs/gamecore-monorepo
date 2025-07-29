import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { LikeService } from "./like.service";
import {
  GuestOrUserTokenGuard,
  CurrentUser,
  BaseLikeService,
  SelectedLikeDto
} from "@gamecorelabs/nestjs-core";
import * as UserRequestTypes from "@gamecorelabs/nestjs-core";

@Controller("like")
export class LikeController {
  constructor(
    private readonly likeService: LikeService,
    private readonly baseLikeService: BaseLikeService
  ) {}

  // 특정 게시글에 좋아요 누른 여부
  @Post("selected")
  @UseGuards(GuestOrUserTokenGuard)
  checkSelectedLike(
    @CurrentUser() user: UserRequestTypes.UserOrGuestLoginRequest,
    @Body() dto: SelectedLikeDto
  ) {
    return this.baseLikeService.checkUserLikeStatus(dto, user);
  }
}
