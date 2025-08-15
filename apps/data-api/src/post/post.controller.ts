import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { PostService } from "./post.service";
import {
  BasePostService,
  CsrfTokenProtectionGuard,
  CurrentUser,
  UserTokenGuard,
  UserLoginRequest,
} from "@gamecorelabs/nestjs-core";
import { S3FileInterceptor } from "./interceptors/s3-file-interceptor";
import { S3_CONFIG } from "src/config/s3.config";

@Controller(["post"])
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly basePostService: BasePostService
  ) {}
}
