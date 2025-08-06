import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  BaseUserService,
  CsrfTokenProtectionGuard,
  CurrentUser,
  RequestUserProfileDto,
  UserAccount,
  UserTokenGuard,
} from '@gamecorelabs/nestjs-core';
import * as userTypes from '@gamecorelabs/nestjs-core';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly baseUserService: BaseUserService,
  ) {}

  @Get('/profile/nickname')
  async checkNicknameExists(@Query('nickname') nickname: string) {
    return this.baseUserService.checkNicknameExists(nickname);
  }

  @Post('profile')
  @UseGuards(CsrfTokenProtectionGuard, UserTokenGuard)
  @UseInterceptors(FileInterceptor('profileImageFile'))
  async profileUpdate(
    @CurrentUser() user: userTypes.UserLoginRequest,
    @UploadedFile() file: Express.MulterS3.File,
    @Body() dto: RequestUserProfileDto,
  ) {
    const createDto = {
      ...dto,
      profileImageFileName: file ? file.key : null,
    };

    return this.baseUserService.updateProfile(createDto, user);
  }
}
