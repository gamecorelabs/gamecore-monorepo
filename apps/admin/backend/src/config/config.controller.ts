import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ConfigService } from './config.service';
import { CreateDomainConfigDto } from './dto/create-domain-config.dto';
import { CreateBoardConfigDto } from './dto/create-board-config.dto';

@Controller('config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Post('/domain')
  postDomainConfig(@Body() body: CreateDomainConfigDto) {
    return this.configService.saveDomainConfig(body);
  }

  @Post('/domain/:id/board')
  postBoardConfig(@Param('id') id: number, @Body() body: CreateBoardConfigDto) {
    return this.configService.saveBoardConfig(id, body);
  }
}
