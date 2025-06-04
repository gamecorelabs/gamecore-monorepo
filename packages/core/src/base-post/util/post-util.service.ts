import { Injectable } from "@nestjs/common";

// post 관련 공통 유틸리티 함수
@Injectable()
export class PostUtilService {
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
}
