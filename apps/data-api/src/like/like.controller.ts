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
import { Request as ExpressRequest } from "express";
import { CommonRequest } from "@_core/base-common/types/resource-types";

@Controller("like")
export class LikeController {
  constructor(
    private readonly likeService: LikeService,
    private readonly baseLikeService: BaseLikeService
  ) {}
}
