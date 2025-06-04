export enum CommentStatus {
  DELETED = 0, // 삭제
  USE = 1, // 사용
  HOLD = 2, // 보류
  ADMIN_DELETED = 99, // 관리자 삭제
}

export enum ResourceType {
  BOARD = "board", // 게시판 글
  NEWS = "news", // 뉴스 글
  GUIDE = "guide", // 가이드 글
}
