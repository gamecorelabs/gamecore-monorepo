export type ChannelConfig = {
  channel: string;
  title: string;
  shortTitle: string;
  description: string;
  theme: string;
  routes: {
    home: string;
    specific: string[];
  };
  // 추가 메타데이터
  metadata?: {
    icon?: string;
    color?: string;
    keywords?: string[];
  };
  menuItems: MenuItem[];
};

export type MenuItem = {
  id: number;
  title: string;
  href: string;
  icon?: string;
  badge?: string;
  children?: MenuItem[];
};

export type Channel = {
  id: number;
  channel: string;
  title: string;
  category: ChannelCategory;
  status: ChannelStatus;
  createdAt: string;
};

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

export const MappingChannelState = {
  [ChannelStatus.TERMINATED]: "서비스 종료",
  [ChannelStatus.ACTIVE]: "활성화",
  [ChannelStatus.MAINTENANCE]: "유지보수 중",
  [ChannelStatus.ARCHIVED]: "보관됨",
};
