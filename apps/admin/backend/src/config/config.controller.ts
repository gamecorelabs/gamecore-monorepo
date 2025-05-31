import { Body, Controller, Get, Post } from '@nestjs/common';
import { ConfigService } from './config.service';
import { CreateDomainConfigDto } from './dto/create-domain-config.dto';

@Controller('config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Get('/board')
  getBoardConfig() {
    return this.configService.boardConfigList();
  }

  @Post('/domain')
  postDomainConfig(@Body() body: CreateDomainConfigDto) {
    return this.configService.saveDomainConfig(body);
  }

  // @Post('/board')
  // postBoardConfig(
  //   @Body() body: CreatePostDto,
  //   // @QueryRunner() qr?: QR,
  // ) {
  //   return this.configService.saveBoardConfig();
  // }
}
