import { ChannelConfig } from "@/types/channel/channel.types";

export const CHANNEL_CONFIG: Record<string, ChannelConfig> = {
  main: {
    channel: "main",
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
    menuItems: [
      { id: 1, title: "홈", href: "/" },
      { id: 2, title: "뉴스", href: "/news/1/post", badge: "NEW" },
      { id: 3, title: "게시판", href: "/board/1/post" },
      { id: 4, title: "이벤트", href: "/events" },
      { id: 5, title: "가이드", href: "/guides" },
      { id: 6, title: "커뮤니티", href: "/community" },
    ],
  },
  baram: {
    channel: "baram",
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
    menuItems: [
      { id: 1, title: "홈", href: "/" },
      { id: 2, title: "뉴스", href: "/news/1/post" },
      {
        id: 3,
        title: "게시판",
        href: "/board/1/post",
        children: [
          { id: 31, title: "자유게시판", href: "/board/1/post" },
          { id: 32, title: "질문게시판", href: "/board/4/post" },
          { id: 33, title: "거래게시판", href: "/board/5/post" },
          { id: 34, title: "길드모집", href: "/board/6/post" },
        ],
      },
      { id: 4, title: "공략", href: "/guides", badge: "HOT" },
      { id: 5, title: "이벤트", href: "/events" },
      { id: 6, title: "스크린샷", href: "/screenshots" },
    ],
  },
  djmax: {
    channel: "djmax",
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
    menuItems: [
      { id: 1, title: "홈", href: "/" },
      { id: 2, title: "뉴스", href: "/news/1/post" },
      {
        id: 3,
        title: "게시판",
        href: "/board/1/post",
        children: [
          { id: 31, title: "자유게시판", href: "/board/1/post" },
          { id: 32, title: "질문게시판", href: "/board/4/post" },
          { id: 33, title: "스코어인증", href: "/board/7/post" },
          { id: 34, title: "영상게시판", href: "/board/8/post" },
        ],
      },
      { id: 4, title: "패턴정보", href: "/patterns" },
      { id: 5, title: "랭킹", href: "/ranking", badge: "LIVE" },
      { id: 6, title: "이벤트", href: "/events" },
      { id: 7, title: "DLC 정보", href: "/dlc" },
    ],
  },
};
