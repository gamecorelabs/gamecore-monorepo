import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigController } from './config.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardConfig } from '@gamecorelabs/nestjs-core/base-board/entity/board-config.entity';
import { BaseAuthModule } from '@gamecorelabs/nestjs-core/base-auth/base-auth.module';
import { BaseUserModule } from '@gamecorelabs/nestjs-core/base-user/base-user.module';
import { ChannelConfig } from '@gamecorelabs/nestjs-core/base-channel/entity/channel-config.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardConfig, ChannelConfig]),
    BaseAuthModule,
    BaseUserModule,
  ],
  controllers: [ConfigController],
  providers: [ConfigService],
})
export class ConfigModule {}
