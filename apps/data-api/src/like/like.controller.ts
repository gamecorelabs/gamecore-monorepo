import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { LikeService } from "./like.service";
import { GuestOrUserTokenGuard } from "@gamecorelabs/nestjs-core/base-auth/guard/guest-or-user-token.guard";
import { CurrentUser } from "@gamecorelabs/nestjs-core/base-user/decorator/current-user.decorator";
import * as UserRequestTypes from "@gamecorelabs/nestjs-core/base-user/types/user.types";
import { BaseLikeService } from "@gamecorelabs/nestjs-core/base-like/base-like.service";
import { SelectedLikeDto } from "@gamecorelabs/nestjs-core/base-like/dto/selected-like.dto";

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
