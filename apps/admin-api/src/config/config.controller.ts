import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ConfigService } from './config.service';
import { CreateDomainConfigDto } from '@gamecorelabs/nestjs-core/base-board/dto/create-domain-config.dto';
import { CreateBoardConfigDto } from '@gamecorelabs/nestjs-core/base-board/dto/create-board-config.dto';
import { AdminRoleUserGuard } from '@gamecorelabs/nestjs-core/base-auth/guard/admin-role-user.guard';

@Controller('config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Post('/domain')
  // @UseGuards(AdminRoleUserGuard)
  postDomainConfig(@Body() body: CreateDomainConfigDto) {
    return this.configService.saveDomainConfig(body);
  }

  @Post('/domain/:id/board')
  // @UseGuards(AdminRoleUserGuard)
  postBoardConfig(@Param('id') id: number, @Body() body: CreateBoardConfigDto) {
    return this.configService.saveBoardConfig(id, body);
  }
}
