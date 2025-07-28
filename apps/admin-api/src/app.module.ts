import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule as CM } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './config/config.module';
import { BoardConfig } from '@gamecorelabs/nestjs-core/base-board/entity/board-config.entity';
import { ChannelConfig } from '@gamecorelabs/nestjs-core/base-channel/entity/channel-config.entity';
import { BoardPost } from '@gamecorelabs/nestjs-core/base-post/board/entity/board-post.entity';
import { UserAccount } from '@gamecorelabs/nestjs-core/base-user/entity/user-account.entity';
import { Comment } from '@gamecorelabs/nestjs-core/base-comment/entity/comment.entity';
import { BoardCategory } from '@gamecorelabs/nestjs-core/base-board/entity/board-category.entity';

@Module({
  imports: [
    CM.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      //데이터베이스 타입
      type: 'mysql',
      host: process.env['DB_HOST'],
      port: parseInt(process.env['DB_PORT'] as string),
      username: process.env['DB_USERNAME'],
      password: process.env['DB_PASSWORD'],
      database: process.env['DB_DATABASE'],
      entities: [
        ChannelConfig,
        BoardConfig,
        BoardCategory,
        BoardPost,
        UserAccount,
        Comment,
      ],
      synchronize: true,
      dropSchema: true, // ⚠️ 모든 테이블 삭제 후 재생성
    }),
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
