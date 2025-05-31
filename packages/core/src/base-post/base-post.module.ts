import { Module } from "@nestjs/common";
import { BasePostService } from "./base-post.service";
import { BasePostController } from "./base-post.controller";

@Module({
  controllers: [BasePostController],
  providers: [BasePostService],
})
export class BasePostModule {}
