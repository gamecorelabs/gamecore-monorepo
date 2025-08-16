import { BadRequestException, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAccount } from '@gamecorelabs/nestjs-core';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';
import * as multerS3 from 'multer-s3';
import { s3Client, S3_CONFIG } from '../config/s3.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserAccount]),
    JwtModule.register({}),
    MulterModule.register({
      limits: {
        fileSize: 1024 * 1024 * 3, // 3MB로 증가
      },
      fileFilter: (req, file, callback) => {
        const ext = extname(file.originalname).toLowerCase();

        if (!ext.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
          callback(
            new BadRequestException(
              'jpg, jpeg, png, gif, webp 파일만 업로드 가능합니다.',
            ),
            false,
          );
        }

        return callback(null, true);
      },
      storage: multerS3({
        s3: s3Client,
        bucket: S3_CONFIG.bucket,
        key: function (req, file, cb) {
          const filename = `${S3_CONFIG.profileImagesPath}/${uuid()}${extname(file.originalname)}`;
          cb(null, filename);
        },
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
          cb(null, {
            fieldName: file.fieldname,
            originalName: file.originalname,
          });
        },
      }),
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
