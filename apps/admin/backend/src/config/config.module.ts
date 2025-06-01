import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigController } from './config.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardConfig } from '@_core/base-board/entity/board-config';
import { DomainConfig } from '@_core/base-common/entity/domain-config';

@Module({
  imports: [TypeOrmModule.forFeature([BoardConfig, DomainConfig])],
  controllers: [ConfigController],
  providers: [ConfigService],
})
export class ConfigModule {}
