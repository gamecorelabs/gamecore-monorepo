"use client";
import { Channel } from "@/types/channel/channel.types";
import {
  NewsConfig,
  NewsStatus,
  NewsType,
  MappingNewsStatus,
  MappingNewsType,
} from "@/types/news/newsConfig.types";

import adminApi from "@/utils/common-axios/adminApi";
import { useEffect, useState } from "react";

const initFormData = {
  title: "",
  description: "",
  status: NewsStatus.ACTIVE,
  type: NewsType.GAME,
  channel: "",
};

export default function NewsManagement() {
  const [news, setNews] = useState<NewsConfig[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState(initFormData);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      const response = await adminApi.get("/config/news");
      setNews(response.data);
    } catch (error) {
      console.error("Failed to load news:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!Object.values(NewsStatus).includes(formData.status)) {
        window.alert("잘못된 뉴스 페이지 상태입니다.");
        return;
      }

      if (!Object.values(NewsType).includes(formData.type)) {
        window.alert("잘못된 뉴스 분류 입니다.");
        return;
      }

      if (!formData.title) {
        window.alert("뉴스 페이지 제목 설정은 필수입니다.");
        return;
      }

      await adminApi.post(`/config/news`, {
        title: formData.title,
        description: formData.description,
        status: formData.status,
        type: formData.type,
      });
    } catch (error) {
      console.error("Failed to create news config:", error);
      window.alert("뉴스 설정 생성에 실패했습니다. 다시 시도해주세요.");
    } finally {
      resetForm();
      loadNews();
    }
  };

  const resetForm = () => {
    setShowAddForm(false);
    setFormData(initFormData);
  };

  const deleteNews = async (id: number) => {
    if (!confirm("정말로 이 뉴스 설정을 삭제하시겠습니까?")) return;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">뉴스 페이지 설정</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          새 뉴스 설정 추가
        </button>
      </div>

      {/* 뉴스 설정 추가 폼 */}
      {showAddForm && (
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">
            새 뉴스 설정 추가
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  뉴스 페이지 설정 상태
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value as NewsStatus,
                    })
                  }
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  required
                >
                  {Object.entries(NewsStatus).map(([key, value]) => (
                    <option key={key} value={value}>
                      {MappingNewsStatus[value]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  뉴스 페이지 타입
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      type: e.target.value as NewsType,
                    })
                  }
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  required
                >
                  {Object.entries(NewsType).map(([key, value]) => (
                    <option key={key} value={value}>
                      {MappingNewsType[value]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                뉴스 페이지 이름
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                placeholder="최신 게임 뉴스, 할인 정보 등"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                설명
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                placeholder="뉴스 페이지에 대한 설명을 입력하세요"
                rows={3}
                required
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
              >
                생성
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
              >
                취소
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 뉴스 설정 목록 */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">
            등록된 뉴스 페이지
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  이름
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  상태
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  생성일
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  작업
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {news.map((data) => (
                <tr key={data.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                    {data.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {data.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full`}
                    >
                      {MappingNewsStatus[data.status as NewsStatus]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {data.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => deleteNews(data.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
