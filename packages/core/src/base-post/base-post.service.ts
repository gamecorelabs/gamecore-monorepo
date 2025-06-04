import { BoardPostService } from "./board/board-post.service";
import { BadRequestException, Injectable } from "@nestjs/common";
import { PostUtilService } from "./util/post-util.service";

@Injectable()
export class BasePostService {
  constructor(
    private readonly boardPostService: BoardPostService,
    private readonly PostUtilService: PostUtilService
  ) {}

  // // 통합 검색 메서드
  // async searchAllContents(keyword: string, options?: any) {
  //   // 모든 도메인에 대해 병렬 검색 수행
  //   const [boardResults, newsResults, guideResults] = await Promise.all([
  //     this.boardPostService.search(keyword, options),
  //     this.newsPostService.search(keyword, options),
  //     this.guidePostService.search(keyword, options),
  //   ]);

  //   // 검색 결과 통합 및 가공
  //   return {
  //     board: this.formatResults(boardResults, "board"),
  //     news: this.formatResults(newsResults, "news"),
  //     guides: this.formatResults(guideResults, "guide"),
  //     // 메타데이터
  //     totalCount:
  //       boardResults.length + newsResults.length + guideResults.length,
  //   };
  // }

  // // 특정 타입의 게시물만 검색
  // async searchByType(type: string, keyword: string, options?: any) {
  //   switch (type) {
  //     case "board":
  //       return this.boardPostService.search(keyword, options);
  //     case "news":
  //       return this.newsPostService.search(keyword, options);
  //     case "guide":
  //       return this.guidePostService.search(keyword, options);
  //     default:
  //       throw new Error(`Unsupported content type: ${type}`);
  //   }
  // }

  // // 검색 결과 포맷팅
  // private formatResults(results: any[], type: string) {
  //   return results.map((item) => ({
  //     ...item,
  //     contentType: type,
  //     url: this.PostUtilService.generateUrl(type, item.id),
  //   }));
  // }
}
