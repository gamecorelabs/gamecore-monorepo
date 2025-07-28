"use client";
import { useEffect, useState } from "react";

interface SystemStats {
  totalDomains: number;
  totalBoards: number;
  totalCategories: number;
  totalUsers: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<SystemStats>({
    totalDomains: 0,
    totalBoards: 0,
    totalCategories: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    // TODO: 시스템 통계 데이터 로드
    // const loadStats = async () => {
    //   try {
    //     const response = await adminApi.get('/stats');
    //     setStats(response.data);
    //   } catch (error) {
    //     console.error('Failed to load stats:', error);
    //   }
    // };
    // loadStats();

    // 임시 데이터
    setStats({
      totalDomains: 3,
      totalBoards: 12,
      totalCategories: 24,
      totalUsers: 156,
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">관리자 대시보드</h1>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                <span className="text-white text-sm font-bold">D</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">총 도메인</p>
              <p className="text-2xl font-semibold text-white">{stats.totalDomains}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                <span className="text-white text-sm font-bold">B</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">총 게시판</p>
              <p className="text-2xl font-semibold text-white">{stats.totalBoards}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                <span className="text-white text-sm font-bold">C</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">총 카테고리</p>
              <p className="text-2xl font-semibold text-white">{stats.totalCategories}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                <span className="text-white text-sm font-bold">U</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">총 사용자</p>
              <p className="text-2xl font-semibold text-white">{stats.totalUsers}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 빠른 작업 */}
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">빠른 작업</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/admin/domains"
            className="block p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
          >
            <h3 className="text-lg font-medium text-white">새 도메인 추가</h3>
            <p className="text-gray-400 text-sm">새로운 서브도메인을 등록합니다</p>
          </a>
          <a
            href="/admin/boards"
            className="block p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
          >
            <h3 className="text-lg font-medium text-white">게시판 생성</h3>
            <p className="text-gray-400 text-sm">새로운 게시판을 만듭니다</p>
          </a>
          <a
            href="/admin/categories"
            className="block p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
          >
            <h3 className="text-lg font-medium text-white">카테고리 관리</h3>
            <p className="text-gray-400 text-sm">게시판 카테고리를 관리합니다</p>
          </a>
        </div>
      </div>
    </div>
  );
}