import { Module } from "@nestjs/common";
import { BaseUserService } from "./base-user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserAccount } from "./entity/user-account.entity";
import { BoardPost } from "@_core/base-post/board/entity/board-post.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserAccount, BoardPost])],
  providers: [BaseUserService],
  exports: [BaseUserService],
})
export class BaseUserModule {}
