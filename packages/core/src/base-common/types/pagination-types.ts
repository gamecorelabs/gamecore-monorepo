export type PaginationInfo = {
  totalCount: number;
  currentPage: number;
  takeByPage: number; // 페이지 당 데이터 갯수
  visiblePageCount: number; // 보여질 페이지 링크 갯수
};
