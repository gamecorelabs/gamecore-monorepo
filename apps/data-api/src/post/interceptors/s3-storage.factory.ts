// s3-storage.factory.ts
import { Injectable } from "@nestjs/common";
import * as multerS3 from "multer-s3";
import type { Options } from "multer";
import { extname } from "path";
import { v4 as uuid } from "uuid";
import { s3Client, S3_CONFIG } from "../../config/s3.config";

@Injectable()
export class S3StorageFactory {
  create(path: string, fileSizeMB: number): Options {
    return {
      storage: multerS3({
        s3: s3Client,
        bucket: S3_CONFIG.bucket,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: (_req, file, cb) => {
          cb(null, `${path}/${uuid()}${extname(file.originalname)}`);
        },
        metadata: function (req, file, cb) {
          cb(null, {
            fieldName: file.fieldname,
            originalName: file.originalname,
          });
        },
      }),
      limits: {
        fileSize: 1024 * 1024 * fileSizeMB, // MB를 바이트로 변환
        files: 10, // 최대 파일 개수
      },
      fileFilter: (_req, file, callback) => {
        try {
          const ext = extname(file.originalname).toLowerCase();

          // 지원하는 이미지 포맷
          const allowedFormats = [".jpg", ".jpeg", ".png", ".gif", ".webp"];

          if (!allowedFormats.includes(ext)) {
            return callback(
              new Error(
                "JPG, JPEG, PNG, GIF, WebP 파일만 업로드 가능합니다."
              ) as any,
              false
            );
          }

          // MIME 타입 검증
          const allowedMimeTypes = [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp",
          ];

          if (!allowedMimeTypes.includes(file.mimetype)) {
            return callback(
              new Error("올바른 이미지 파일이 아닙니다.") as any,
              false
            );
          }

          // 파일명 검증 (특수문자 제한)
          if (!/^[a-zA-Z0-9._-]+$/.test(file.originalname)) {
            return callback(
              new Error("파일명에 특수문자가 포함되어 있습니다.") as any,
              false
            );
          }

          return callback(null, true);
        } catch (error) {
          return callback(
            new Error("파일 검증 중 오류가 발생했습니다.") as any,
            false
          );
        }
      },
    };
  }
}
