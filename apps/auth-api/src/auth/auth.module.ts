import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAccount } from '@_core/base-user/entity/user-account.entity';
import { BaseUserModule } from '@_core/base-user/base-user.module';
import { BaseAuthModule } from '@_core/base-auth/base-auth.module';
import { BaseLikeModule } from '@_core/base-like/base-like.module';
import { BaseCommonModule } from '@_core/base-common/base-common.module';
import { BoardPost } from '@_core/base-post/board/entity/board-post.entity';
import { BoardConfig } from '@_core/base-board/entity/board-config.entity';
import { DomainConfig } from '@_core/base-domain/entity/domain-config.entity';
import { Like } from '@_core/base-like/entity/like.entity';
import { Comment } from '@_core/base-comment/entity/comment.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserAccount,
      BoardPost,
      BoardConfig,
      DomainConfig,
      Like,
      Comment,
    ]),
    JwtModule.register({}),
    BaseUserModule,
    BaseAuthModule,
    BaseLikeModule,
    BaseCommonModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
