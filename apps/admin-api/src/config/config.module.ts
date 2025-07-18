import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigController } from './config.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardConfig } from '@gamecorelabs/nestjs-core/base-board/entity/board-config.entity';
import { DomainConfig } from '@gamecorelabs/nestjs-core/base-domain/entity/domain-config.entity';
import { BaseAuthModule } from '@gamecorelabs/nestjs-core/base-auth/base-auth.module';
import { BaseUserModule } from '@gamecorelabs/nestjs-core/base-user/base-user.module';

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
