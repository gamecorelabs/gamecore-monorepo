import { SubdomainConfig } from "@/types/common/domain.types";

export const CHANNEL_CONFIG: Record<string, SubdomainConfig> = {
  main: {
    domain: "main",
    title: "게임코어",
    shortTitle: "게임코어",
    description: "게임코어 메인페이지",
    theme: "theme-default",
    routes: {
      home: "/channels/main",
      specific: ["/news", "/events", "/guides", "/community"],
    },
    metadata: {
      icon: "channels/main/channel-icon.png",
      color: "#FF5733",
      keywords: ["gamecore", "game", "core", "news"],
    },
  },
  baram: {
    domain: "baram",
    title: "바람의나라 클래식",
    shortTitle: "바클코어",
    description: "바람의나라 클래식 - 게임코어",
    theme: "baram-theme",
    routes: {
      home: "/channels/baram",
      specific: ["/news", "/events", "/guides", "/community"],
    },
    metadata: {
      icon: "channels/baram/channel-icon.png",
      color: "#FF5733",
      keywords: ["baram", "game", "news", "events"],
    },
  },
  djmax: {
    domain: "djmax",
    title: "DJMAX Respect V",
    shortTitle: "디맥코어",
    description: "DJMAX Respect V - 게임코어",
    theme: "djmax-theme",
    routes: {
      home: "/channels/djmax",
      specific: ["/news", "/events", "/guides", "/community"],
    },
    metadata: {
      icon: "channels/djmax/channel-icon.png",
      color: "#FF5733",
      keywords: ["djmax", "game", "news", "events"],
    },
  },
};
