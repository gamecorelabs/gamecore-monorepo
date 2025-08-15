import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  mixin,
  NestInterceptor,
  Type,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Observable } from "rxjs";
import { S3StorageFactory } from "./s3-storage.factory";

export function S3FileInterceptor(
  fieldName: string,
  path: string,
  fileSizeMB: number
): Type<NestInterceptor> {
  @Injectable()
  class MixinInterceptor implements NestInterceptor {
    private fileInterceptor: NestInterceptor;

    constructor(
      @Inject(S3StorageFactory) private readonly factory: S3StorageFactory
    ) {
      // 팩토리에서 옵션을 가져와서 FileInterceptor 인스턴스 생성
      const options = this.factory.create(path, fileSizeMB);
      const InterceptorClass = FileInterceptor(fieldName, options);
      this.fileInterceptor = new InterceptorClass();
    }

    intercept(
      context: ExecutionContext,
      next: CallHandler
    ): Observable<any> | Promise<Observable<any>> {
      return this.fileInterceptor.intercept(context, next);
    }
  }

  return mixin(MixinInterceptor);
}
