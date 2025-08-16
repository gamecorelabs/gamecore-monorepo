import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ENV_AWS_S3_URL } from "@base-common/const/env-keys.const";

// post 관련 공통 유틸리티 함수
@Injectable()
export class PostUtilService {
  constructor(private readonly configService: ConfigService) {}
  // URL 생성 유틸리티
  generateUrl(type: string, id: number) {
    switch (type) {
      case "board":
        return `/board/${id}`;
      case "news":
        return `/news/${id}`;
      case "guide":
        return `/guides/${id}`;
      default:
        return `/${type}/${id}`;
    }
  }

  extractFirstImage(content: string): string | null {
    const s3Url = this.configService.get<string>(ENV_AWS_S3_URL) as string;
    const imgRegex = /<img[^>]+src\s*=\s*["']([^"']+)["'][^>]*>/i;
    const match = content.match(imgRegex);

    if (match && match[1]) {
      const fullImageUrl = match[1];

      try {
        const url = new URL(fullImageUrl);

        // S3 도메인인지 확인
        if (fullImageUrl.startsWith(s3Url)) {
          // pathname에서 맨 앞 '/' 제거하여 S3 key 형태로 반환
          return url.pathname.startsWith("/")
            ? url.pathname.substring(1)
            : url.pathname;
        } else {
          return null;
        }
      } catch (error) {
        return null;
      }
    }
    return null;
  }
}
