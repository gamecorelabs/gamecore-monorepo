import { Module } from "@nestjs/common";
import { BaseLikeService } from "./base-like.service";

@Module({
  providers: [BaseLikeService],
})
export class BaseLikeModule {}
