import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigController } from './config.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardConfig, ChannelConfig } from '@gamecorelabs/nestjs-core';

@Module({
  imports: [TypeOrmModule.forFeature([BoardConfig, ChannelConfig])],
  controllers: [ConfigController],
  providers: [ConfigService],
})
export class ConfigModule {}
