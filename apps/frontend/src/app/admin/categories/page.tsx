"use client";
import { useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
  description: string;
  boardId: string;
  channel: string;
  color: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
}

export default function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    boardId: "",
    channel: "",
    color: "#3B82F6",
    sortOrder: 0,
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    // TODO: API 호출로 카테고리 목록 로드
    // try {
    //   const response = await adminApi.get('/categories');
    //   setCategories(response.data);
    // } catch (error) {
    //   console.error('Failed to load categories:', error);
    // }

    // 임시 데이터
    setCategories([
      {
        id: 1,
        name: "일반공지",
        description: "일반적인 공지사항",
        boardId: "notice",
        channel: "main",
        color: "#3B82F6",
        sortOrder: 1,
        isActive: true,
        createdAt: "2024-01-01",
      },
      {
        id: 2,
        name: "긴급공지",
        description: "긴급한 공지사항",
        boardId: "notice",
        channel: "main",
        color: "#EF4444",
        sortOrder: 0,
        isActive: true,
        createdAt: "2024-01-01",
      },
      {
        id: 3,
        name: "질문",
        description: "질문 관련 게시글",
        boardId: "free",
        channel: "main",
        color: "#10B981",
        sortOrder: 1,
        isActive: true,
        createdAt: "2024-01-02",
      },
      {
        id: 4,
        name: "정보공유",
        description: "유용한 정보 공유",
        boardId: "free",
        channel: "main",
        color: "#8B5CF6",
        sortOrder: 2,
        isActive: true,
        createdAt: "2024-01-02",
      },
      {
        id: 5,
        name: "업데이트",
        description: "DJMAX 업데이트 소식",
        boardId: "djmax-news",
        channel: "djmax",
        color: "#06B6D4",
        sortOrder: 0,
        isActive: true,
        createdAt: "2024-01-03",
      },
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API 호출로 새 카테고리 생성
    // try {
    //   await adminApi.post('/categories', formData);
    //   setShowAddForm(false);
    //   setFormData({
    //     name: "",
    //     description: "",
    //     boardId: "",
    //     channel: "",
    //     color: "#3B82F6",
    //     sortOrder: 0,
    //   });
    //   loadCategories();
    // } catch (error) {
    //   console.error('Failed to create category:', error);
    // }

    console.log("Creating category:", formData);
    setShowAddForm(false);
    setFormData({
      name: "",
      description: "",
      boardId: "",
      channel: "",
      color: "#3B82F6",
      sortOrder: 0,
    });
  };

  const toggleCategoryStatus = async (id: number, isActive: boolean) => {
    // TODO: API 호출
    // try {
    //   await adminApi.patch(`/categories/${id}`, { isActive: !isActive });
    //   loadCategories();
    // } catch (error) {
    //   console.error('Failed to update category:', error);
    // }

    console.log("Toggling category status:", id, !isActive);
  };

  const deleteCategory = async (id: number) => {
    if (!confirm("정말로 이 카테고리를 삭제하시겠습니까?")) return;

    // TODO: API 호출
    // try {
    //   await adminApi.delete(`/categories/${id}`);
    //   loadCategories();
    // } catch (error) {
    //   console.error('Failed to delete category:', error);
    // }

    console.log("Deleting category:", id);
  };

  const updateSortOrder = async (id: number, newOrder: number) => {
    // TODO: API 호출
    // try {
    //   await adminApi.patch(`/categories/${id}`, { sortOrder: newOrder });
    //   loadCategories();
    // } catch (error) {
    //   console.error('Failed to update sort order:', error);
    // }

    console.log("Updating sort order:", id, newOrder);
  };

  const groupedCategories = categories.reduce((acc, category) => {
    const key = `${category.channel}-${category.boardId}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(category);
    return acc;
  }, {} as Record<string, Category[]>);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">카테고리 설정</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          새 카테고리 추가
        </button>
      </div>

      {/* 카테고리 추가 폼 */}
      {showAddForm && (
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">
            새 카테고리 추가
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  채널
                </label>
                <select
                  value={formData.channel}
                  onChange={(e) =>
                    setFormData({ ...formData, channel: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  required
                >
                  <option value="">채널 선택</option>
                  <option value="main">main</option>
                  <option value="djmax">djmax</option>
                  <option value="baram">baram</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  게시판 ID
                </label>
                <input
                  type="text"
                  value={formData.boardId}
                  onChange={(e) =>
                    setFormData({ ...formData, boardId: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  placeholder="notice, free, news 등"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  카테고리 이름
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  placeholder="일반공지, 질문 등"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  색상
                </label>
                <div className="flex space-x-2">
                  <input
                    type="color"
                    value={formData.color}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                    className="w-12 h-10 rounded border border-gray-600"
                  />
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                    className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                    pattern="^#[0-9A-Fa-f]{6}$"
                  />
                </div>
              </div>
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
                placeholder="카테고리에 대한 설명을 입력하세요"
                rows={3}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                정렬 순서
              </label>
              <input
                type="number"
                value={formData.sortOrder}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sortOrder: parseInt(e.target.value),
                  })
                }
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                min="0"
                placeholder="0 (숫자가 작을수록 상위 표시)"
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

      {/* 카테고리 목록 (게시판별로 그룹화) */}
      {Object.entries(groupedCategories).map(([key, boardCategories]) => {
        const [channel, boardId] = key.split("-");
        const sortedCategories = [...boardCategories].sort(
          (a, b) => a.sortOrder - b.sortOrder
        );

        return (
          <div
            key={key}
            className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-white">
                {channel} - {boardId} 게시판 카테고리
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      순서
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      카테고리
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      설명
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
                  {sortedCategories.map((category) => (
                    <tr key={category.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <input
                          type="number"
                          value={category.sortOrder}
                          onChange={(e) =>
                            updateSortOrder(
                              category.id,
                              parseInt(e.target.value)
                            )
                          }
                          className="w-16 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-center"
                          min="0"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        <div className="flex items-center">
                          <div
                            className="w-4 h-4 rounded mr-3"
                            style={{ backgroundColor: category.color }}
                          ></div>
                          {category.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300 max-w-xs truncate">
                        {category.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            category.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {category.isActive ? "활성" : "비활성"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {category.createdAt}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() =>
                            toggleCategoryStatus(category.id, category.isActive)
                          }
                          className={`${
                            category.isActive
                              ? "text-yellow-400 hover:text-yellow-300"
                              : "text-green-400 hover:text-green-300"
                          }`}
                        >
                          {category.isActive ? "비활성화" : "활성화"}
                        </button>
                        <button
                          onClick={() => deleteCategory(category.id)}
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
        );
      })}
    </div>
  );
}
