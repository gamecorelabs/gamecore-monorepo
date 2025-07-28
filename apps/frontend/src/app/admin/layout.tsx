import type { Metadata } from "next";
import "../globals.css";
import "@/styles/themes.css";
import { getCurrentUser } from "@/utils/auth/getCurrentUser";
import { FallbackPage } from "@/components/ui-library";
import Link from "next/link";

export const metadata: Metadata = {
  title: "GameCore Admin",
  description: "GameCore 관리자 페이지",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user || !["admin", "super_admin"].includes(user.user_account.role)) {
    return (
      <FallbackPage
        message="존재하지 않는 페이지입니다."
        delay={2000}
        redirectTo="/"
      />
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-900 theme-default">
        {/* 상단 네비게이션 */}
        <nav className="bg-gray-800 border-b border-gray-700">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-bold text-white">GameCore Admin</h1>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  href="/"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  메인 사이트로
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* 메인 레이아웃 */}
        <div className="flex h-[calc(100vh-4rem)]">
          {/* 사이드바 */}
          <aside className="w-64 bg-gray-800 flex-shrink-0 overflow-y-auto">
            <nav className="mt-8 px-4">
              <div className="space-y-2">
                <Link
                  href="/admin"
                  className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors whitespace-nowrap"
                >
                  대시보드
                </Link>
                <Link
                  href="/admin/domains"
                  className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors whitespace-nowrap"
                >
                  도메인 관리
                </Link>
                <Link
                  href="/admin/boards"
                  className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors whitespace-nowrap"
                >
                  게시판 설정
                </Link>
                <Link
                  href="/admin/categories"
                  className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors whitespace-nowrap"
                >
                  카테고리 설정
                </Link>
              </div>
            </nav>
          </aside>

          {/* 메인 콘텐츠 */}
          <main className="flex-1 overflow-y-auto bg-gray-900">
            <div className="p-8">
              <div className="max-w-full">{children}</div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
