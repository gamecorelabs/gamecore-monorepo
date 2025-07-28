import { Global, Module } from "@nestjs/common";
import { BaseBoardModule } from "./base-board/base-board.module";
import { BasePostModule } from "./base-post/base-post.module";
import { BaseCommentModule } from "./base-comment/base-comment.module";
import { BaseUserModule } from "./base-user/base-user.module";
import { BaseAuthModule } from "./base-auth/base-auth.module";
import { BaseLikeModule } from "./base-like/base-like.module";
import { BaseCommonModule } from "./base-common/base-common.module";
import { BaseChannelModule } from "./base-channel/base-channel.module";

@Global()
@Module({
  imports: [
    BaseBoardModule,
    BasePostModule,
    BaseCommentModule,
    BaseUserModule,
    BaseAuthModule,
    BaseLikeModule,
    BaseCommonModule,
    BaseChannelModule,
  ],
  exports: [
    BaseBoardModule,
    BasePostModule,
    BaseCommentModule,
    BaseUserModule,
    BaseAuthModule,
    BaseLikeModule,
    BaseCommonModule,
    BaseChannelModule,
  ],
})
export class CoreModule {}
