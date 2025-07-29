import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ConfigService } from './config.service';
import {
  CreateChannelConfigDto,
  CreateBoardConfigDto,
  AdminRoleUserGuard,
  GuestOrUserTokenGuard,
} from '@gamecorelabs/nestjs-core';

@Controller('config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Get('/channel')
  @UseGuards(GuestOrUserTokenGuard)
  @UseGuards(AdminRoleUserGuard)
  getChannelConfig() {
    return this.configService.getChannelConfig();
  }

  @Post('/channel')
  @UseGuards(AdminRoleUserGuard)
  postChannelConfig(@Body() body: CreateChannelConfigDto) {
    return this.configService.saveChannelConfig(body);
  }

  // 게시판 설정 저장
  @Post('/channel/:id/board')
  @UseGuards(AdminRoleUserGuard)
  postBoardConfig(@Param('id') id: number, @Body() body: CreateBoardConfigDto) {
    return this.configService.saveBoardConfig(id, body);
  }

  // 설정된 게시판 모두 불러오기
  @Get('/board')
  getBoardConfig() {
    // return this.configService.getBoardConfig();
  }
}
