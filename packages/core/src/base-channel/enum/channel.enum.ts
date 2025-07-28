export enum ChannelCategory {
  GAME = "game",
  HOBBY = "hobby",
  COMMUNITY = "community",
  EDUCATION = "education",
  ETC = "etc",
}

export enum ChannelStatus {
  TERMINATED = "0", // 서비스 종료 (비활성화)
  ACTIVE = "1", // 활성화 (서비스 중)
  MAINTENANCE = "2", // 유지보수 단계 (관계자만 접속 가능)
  ARCHIVED = "3", // 보관됨 (관계자만 접속 가능)
}
