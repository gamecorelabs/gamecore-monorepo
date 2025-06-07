import { PickType } from "@nestjs/mapped-types";
import { BoardPost } from "../entity/board-post.entity";
import { BoardConfig } from "@_core/base-board/entity/board-config.entity";
import { UserOrGuestLoginRequest } from "@_core/base-user/types/user.types";

export class CreateBoardPostDto extends PickType(BoardPost, [
  "title",
  "content",
  "boardConfig",
]) {}

export class RequestCreateBoardPostDto extends PickType(CreateBoardPostDto, [
  "title",
  "content",
]) {}
