"use client";

import { useState, useEffect } from "react";
import { getChannelFromHost } from "./useChannel";
import { ChannelConfig } from "@/types/common/channel.types";

/**
 * 클라이언트 컴포넌트에서 채널 정보를 사용하는 훅
 */
export function useChannelClient() {
  const [channelInfo, setChannelInfo] = useState<{
    channel: string | null;
    config: ChannelConfig | null;
  }>({ channel: null, config: null });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const info = getChannelFromHost();
    setChannelInfo(info);
    setIsLoading(false);
  }, []);

  return { ...channelInfo, isLoading };
}

/**
 * 채널 기반 네비게이션 훅
 */
export function useChannelNavigation() {
  const { channel, config } = useChannelClient();

  const navigateToChannel = (targetChannel: string, path: string = "/") => {
    const protocol = window.location.protocol;
    const host = window.location.host;
    const parts = host.split(".");

    let newHost: string;

    if (parts.length >= 4 && parts[0] === "dev") {
      // dev.current.gamecore.co.kr -> dev.target.gamecore.co.kr
      newHost = `dev.${targetChannel}.${parts.slice(2).join(".")}`;
    } else {
      // current.gamecore.co.kr -> target.gamecore.co.kr
      newHost = `${targetChannel}.${parts.slice(1).join(".")}`;
    }

    window.location.href = `${protocol}//${newHost}${path}`;
  };

  const navigateToMain = (path: string = "/") => {
    const protocol = window.location.protocol;
    const host = window.location.host;
    const parts = host.split(".");

    let newHost: string;

    if (parts.length >= 4 && parts[0] === "dev") {
      // dev.current.gamecore.co.kr -> dev.gamecore.co.kr
      newHost = `dev.${parts.slice(2).join(".")}`;
    } else {
      // current.gamecore.co.kr -> gamecore.co.kr
      newHost = parts.slice(1).join(".");
    }

    window.location.href = `${protocol}//${newHost}${path}`;
  };

  return {
    channel,
    config,
    navigateToChannel,
    navigateToMain,
  };
}
