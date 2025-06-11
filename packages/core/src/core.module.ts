import { Global, Module } from "@nestjs/common";
import { BaseBoardModule } from "./base-board/base-board.module";
import { BasePostModule } from "./base-post/base-post.module";
import { BaseCommentModule } from "./base-comment/base-comment.module";
import { BaseUserModule } from "./base-user/base-user.module";
import { BaseAuthModule } from "./base-auth/base-auth.module";
import { BaseLikeModule } from "./base-like/base-like.module";
import { BaseDomainModule } from "./base-domain/base-domain.module";
import { BaseCommonModule } from "./base-common/base-common.module";

@Global()
@Module({
  imports: [
    BaseBoardModule,
    BasePostModule,
    BaseCommentModule,
    BaseUserModule,
    BaseAuthModule,
    BaseLikeModule,
    BaseDomainModule,
    BaseCommonModule,
  ],
  exports: [
    BaseBoardModule,
    BasePostModule,
    BaseCommentModule,
    BaseUserModule,
    BaseAuthModule,
    BaseLikeModule,
    BaseDomainModule,
    BaseCommonModule,
  ],
})
export class CoreModule {}
