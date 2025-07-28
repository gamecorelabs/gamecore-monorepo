import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@/styles/themes.css";
import { Container, Header, Main, Footer, FallbackPage } from "@ui-library";
import { getCurrentUser } from "@/utils/auth/getCurrentUser";
import SessionRefresher from "@/components/session/SessionRefresh";
import { hasRefreshToken } from "@/utils/auth/hasRefreshToken";
import { getChannelInfo, getChannelThemeClass } from "@/utils/hooks/useChannel";
import { ThemeProvider } from "@/contexts/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GameCore",
  description: "게임 코어 - 개발 테스트 단계 입니다.",
  icons: [
    {
      rel: "icon",
      url: "/favicon/favicon-96x96.png",
      type: "image/png",
      sizes: "96x96",
    },
    { rel: "icon", url: "/favicon/favicon.svg", type: "image/svg+xml" },
    { rel: "shortcut icon", url: "/favicon/favicon.ico" },
    {
      rel: "apple-touch-icon",
      url: "/favicon/apple-touch-icon.png",
      sizes: "180x180",
    },
  ],
  manifest: "/favicon/site.webmanifest",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();
  const hasRefresh = await hasRefreshToken();
  const { channel, config } = await getChannelInfo();
  const themeClass = getChannelThemeClass(channel);

  if (!channel || !config) {
    return (
      <FallbackPage
        message="채널 정보가 존재하지 않습니다."
        redirectTo="/"
        delay={3000}
      />
    );
  }

  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${themeClass} antialiased themed-container`}
      >
        <ThemeProvider>
          <Container>
            <SessionRefresher user={user} hasRefreshToken={hasRefresh} />
            <Header config={config} />
            <Main>{children}</Main>
            <Footer />
          </Container>
        </ThemeProvider>
      </body>
    </html>
  );
}
