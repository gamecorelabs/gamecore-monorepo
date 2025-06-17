export enum BoardType {
  FREE = "basic", // 기본 스킨
  GALLERY = "gallery", // 갤러리 스킨
  ETC = "etc",
}

export enum BoardStatus {
  INACTIVE = "0", // 비활성화
  ACTIVE = "1",
  MAINTENANCE = "2", // 유지보수 (관계자만 접속 가능)
  ARCHIVED = "3", // 보관됨 (관계자만 접속 가능)
}
