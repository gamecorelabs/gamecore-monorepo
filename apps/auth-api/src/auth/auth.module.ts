import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAccount } from '@gamecorelabs/nestjs-core/base-user/entity/user-account.entity';
import { BaseUserModule } from '@gamecorelabs/nestjs-core/base-user/base-user.module';
import { BaseAuthModule } from '@gamecorelabs/nestjs-core/base-auth/base-auth.module';
import { BaseLikeModule } from '@gamecorelabs/nestjs-core/base-like/base-like.module';
import { BoardPost } from '@gamecorelabs/nestjs-core/base-post/board/entity/board-post.entity';
import { BoardConfig } from '@gamecorelabs/nestjs-core/base-board/entity/board-config.entity';
import { DomainConfig } from '@gamecorelabs/nestjs-core/base-domain/entity/domain-config.entity';
import { Like } from '@gamecorelabs/nestjs-core/base-like/entity/like.entity';
import { Comment } from '@gamecorelabs/nestjs-core/base-comment/entity/comment.entity';
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
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
