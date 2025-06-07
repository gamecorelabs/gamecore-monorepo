import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigController } from './config.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardConfig } from '@_core/base-board/entity/board-config.entity';
import { DomainConfig } from '@_core/base-domain/entity/domain-config.entity';
import { BaseAuthModule } from '@_core/base-auth/base-auth.module';
import { BaseUserModule } from '@_core/base-user/base-user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardConfig, DomainConfig]),
    BaseAuthModule,
    BaseUserModule,
  ],
  controllers: [ConfigController],
  providers: [ConfigService],
})
export class ConfigModule {}
