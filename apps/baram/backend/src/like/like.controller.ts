import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { LikeService } from "./like.service";
import { GuestOrUserTokenGuard } from "@_core/base-auth/guard/guest-or-user-token.guard";
import { CurrentUser } from "@_core/base-user/decorator/current-user.decorator";
import { UserOrGuestLoginRequest } from "@_core/base-user/types/user.types";
import { ResourceExistenceGuard } from "@_core/base-common/guard/resource-existence.guard";
import { BaseLikeService } from "@_core/base-like/base-like.service";
import {
  CreateLikeDto,
  CreateRequestLikeDto,
} from "@_core/base-like/dto/create-like.dto";

@Controller("like")
export class LikeController {
  constructor(
    private readonly likeService: LikeService,
    private readonly baseLikeService: BaseLikeService
  ) {}

  @Post("/:resource_type/:id")
  @UseGuards(GuestOrUserTokenGuard)
  @UseGuards(ResourceExistenceGuard)
  async toggleLike(
    @Request() req: any,
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
