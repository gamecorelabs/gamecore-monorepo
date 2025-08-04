export enum ResourceType {
  BOARD = "board", // 게시판
  NEWS = "news", // 뉴스
  BOARD_POST = "board-post", // 게시글
  NEWS_POST = "news-post", // 뉴스 글
  GUIDE_POST = "guide-post", // 가이드 글
  COMMENT = "comment", // 댓글
}

export type ResourceInfo = {
  resourceType: ResourceType;
  resourceId: number;
};
