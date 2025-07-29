import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from './config.service';
import {
  CreateChannelConfigDto,
  CreateBoardConfigDto,
  AdminRoleUserGuard,
  GuestOrUserTokenGuard,
  BaseChannelService,
} from '@gamecorelabs/nestjs-core';

@Controller('config')
export class ConfigController {
  constructor(
    private readonly configService: ConfigService,
    private readonly baseChannelService: BaseChannelService,
  ) {}

  @Get('/channel')
  @UseGuards(GuestOrUserTokenGuard)
  @UseGuards(AdminRoleUserGuard)
  getChannelConfig() {
    return this.configService.getChannelConfig();
  }

  @Get('/channel/:channel/status')
  async getChannelStatus(@Param('channel') channel: string) {
    return await this.baseChannelService.getChannelStatusByChannelName(channel);
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
    return this.configService.getBoardConfig();
  }
}
