"use client";

import { useState, useEffect } from "react";
import { getSubdomainFromHost } from "./useSubdomain";
import { SubdomainConfig } from "@/config/subdomains";

/**
 * 클라이언트 컴포넌트에서 서브도메인 정보를 사용하는 훅
 */
export function useSubdomainClient() {
  const [subdomainInfo, setSubdomainInfo] = useState<{
    subdomain: string | null;
    config: SubdomainConfig | null;
  }>({ subdomain: null, config: null });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const info = getSubdomainFromHost();
    setSubdomainInfo(info);
    setIsLoading(false);
  }, []);

  return { ...subdomainInfo, isLoading };
}

/**
 * 서브도메인 기반 네비게이션 훅
 */
export function useSubdomainNavigation() {
  const { subdomain, config } = useSubdomainClient();

  const navigateToSubdomain = (targetSubdomain: string, path: string = "/") => {
    const protocol = window.location.protocol;
    const host = window.location.host;
    const parts = host.split(".");

    let newHost: string;

    if (parts.length >= 4 && parts[0] === "dev") {
      // dev.current.gamecore.co.kr -> dev.target.gamecore.co.kr
      newHost = `dev.${targetSubdomain}.${parts.slice(2).join(".")}`;
    } else {
      // current.gamecore.co.kr -> target.gamecore.co.kr
      newHost = `${targetSubdomain}.${parts.slice(1).join(".")}`;
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
    subdomain,
    config,
    navigateToSubdomain,
    navigateToMain,
  };
}
