import { Controller, Get, Post } from '@nestjs/common';
import { ConfigService } from './config.service';

@Controller('config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Get('/board')
  getBoardConfig() {
    return this.configService.boardConfigList();
  }

  @Post('/board')
  postBoardConfig() {
    return this.configService.saveBoardConfig();
  }
}
