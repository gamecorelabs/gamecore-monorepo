import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule as CM } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './config/config.module';
import { BoardConfig } from '@gamecoregg/nestjs-core/base-board/entity/board-config.entity';
import { DomainConfig } from '@gamecoregg/nestjs-core/base-domain/entity/domain-config.entity';
import { BoardPost } from '@gamecoregg/nestjs-core/base-post/board/entity/board-post.entity';
import { UserAccount } from '@gamecoregg/nestjs-core/base-user/entity/user-account.entity';
import { Comment } from '@gamecoregg/nestjs-core/base-comment/entity/comment.entity';
import { BoardCategory } from '@gamecoregg/nestjs-core/base-board/entity/board-category.entity';

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
        DomainConfig,
        BoardConfig,
        BoardCategory,
        BoardPost,
        UserAccount,
        Comment,
      ],
      synchronize: true,
    }),
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
