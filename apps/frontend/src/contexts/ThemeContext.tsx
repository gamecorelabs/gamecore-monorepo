"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

type ThemeMode = 'dark' | 'light';

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
  isDark: boolean;
  isLight: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('dark');
  const [mounted, setMounted] = useState(false);

  // 클라이언트 사이드에서만 실행
  useEffect(() => {
    setMounted(true);
    
    // localStorage에서 테마 모드 가져오기
    const savedMode = localStorage.getItem('theme-mode') as ThemeMode;
    if (savedMode && (savedMode === 'dark' || savedMode === 'light')) {
      setMode(savedMode);
    } else {
      // 기본값: 시스템 선호도 확인
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setMode(prefersDark ? 'dark' : 'light');
    }
  }, []);

  // body 클래스 업데이트
  useEffect(() => {
    if (!mounted) return;

    const body = document.body;
    
    // 기존 light-mode 클래스 제거
    body.classList.remove('light-mode');
    
    // 라이트 모드인 경우 클래스 추가
    if (mode === 'light') {
      body.classList.add('light-mode');
    }
    
    // localStorage에 저장
    localStorage.setItem('theme-mode', mode);
  }, [mode, mounted]);

  const toggleTheme = () => {
    setMode(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // SSR 방지: 클라이언트에서 마운트되기 전까지는 기본값 사용
  if (!mounted) {
    return <ThemeContext.Provider value={{
      mode: 'dark',
      toggleTheme: () => {},
      isDark: true,
      isLight: false,
    }}>{children}</ThemeContext.Provider>;
  }

  return (
    <ThemeContext.Provider value={{
      mode,
      toggleTheme,
      isDark: mode === 'dark',
      isLight: mode === 'light',
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}