export type ChannelConfig = {
  domain: string;
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
};
