"use client";
import { Channel, ChannelCategory } from "@/types/common/channel.types";
import adminApi from "@/utils/common-axios/adminApi";
import { useEffect, useState } from "react";

interface Board {
  id: number;
  boardId: string;
  name: string;
  description: string;
  channel: string;
  isActive: boolean;
  allowAnonymous: boolean;
  requireAuth: boolean;
  maxPostLength: number;
  createdAt: string;
}

export default function BoardManagement() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [boards, setBoards] = useState<Board[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    boardId: "",
    name: "",
    description: "",
    channel: "",
    allowAnonymous: true,
    requireAuth: false,
    maxPostLength: 10000,
  });

  useEffect(() => {
    loadChannels();
    loadBoards();
  }, []);
  const loadChannels = async () => {
    try {
      const response = await adminApi.get("/config/channel");
      setChannels(response.data);
    } catch (error) {
      console.error("Failed to load channels:", error);
    }
  };

  const loadBoards = async () => {
    // TODO: API 호출로 게시판 목록 로드
    // try {
    //   const response = await adminApi.get('/boards');
    //   setBoards(response.data);
    // } catch (error) {
    //   console.error('Failed to load boards:', error);
    // }

    // 임시 데이터
    setBoards([
      {
        id: 1,
        boardId: "notice",
        name: "공지사항",
        description: "중요한 공지사항을 게시하는 게시판입니다",
        channel: "main",
        isActive: true,
        allowAnonymous: false,
        requireAuth: true,
        maxPostLength: 5000,
        createdAt: "2024-01-01",
      },
      {
        id: 2,
        boardId: "free",
        name: "자유게시판",
        description: "자유롭게 의견을 나누는 게시판입니다",
        channel: "main",
        isActive: true,
        allowAnonymous: true,
        requireAuth: false,
        maxPostLength: 10000,
        createdAt: "2024-01-02",
      },
      {
        id: 3,
        boardId: "djmax-news",
        name: "DJMAX 뉴스",
        description: "DJMAX 관련 최신 뉴스",
        channel: "djmax",
        isActive: true,
        allowAnonymous: false,
        requireAuth: true,
        maxPostLength: 15000,
        createdAt: "2024-01-03",
      },
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API 호출로 새 게시판 생성
    // try {
    //   await adminApi.post('/boards', formData);
    //   setShowAddForm(false);
    //   setFormData({
    //     boardId: "",
    //     name: "",
    //     description: "",
    //     channel: "",
    //     allowAnonymous: true,
    //     requireAuth: false,
    //     maxPostLength: 10000,
    //   });
    //   loadBoards();
    // } catch (error) {
    //   console.error('Failed to create board:', error);
    // }

    console.log("Creating board:", formData);
    setShowAddForm(false);
    setFormData({
      boardId: "",
      name: "",
      description: "",
      channel: "",
      allowAnonymous: true,
      requireAuth: false,
      maxPostLength: 10000,
    });
  };

  const toggleBoardStatus = async (id: number, isActive: boolean) => {
    // TODO: API 호출
    // try {
    //   await adminApi.patch(`/boards/${id}`, { isActive: !isActive });
    //   loadBoards();
    // } catch (error) {
    //   console.error('Failed to update board:', error);
    // }

    console.log("Toggling board status:", id, !isActive);
  };

  const deleteBoard = async (id: number) => {
    if (!confirm("정말로 이 게시판을 삭제하시겠습니까?")) return;

    // TODO: API 호출
    // try {
    //   await adminApi.delete(`/boards/${id}`);
    //   loadBoards();
    // } catch (error) {
    //   console.error('Failed to delete board:', error);
    // }

    console.log("Deleting board:", id);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">게시판 설정</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          새 게시판 추가
        </button>
      </div>

      {/* 게시판 추가 폼 */}
      {showAddForm && (
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">
            새 게시판 추가
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  {channels.map((channel) => (
                    <option key={channel.id} value={channel.id}>
                      {channel.title} ({channel.channel})
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                게시판 이름
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                placeholder="공지사항, 자유게시판 등"
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
                placeholder="게시판에 대한 설명을 입력하세요"
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

      {/* 게시판 목록 */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">등록된 게시판</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  게시판 ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  이름
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  채널
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
              {boards.map((board) => (
                <tr key={board.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                    {board.boardId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {board.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {board.channel}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        board.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {board.isActive ? "활성" : "비활성"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {board.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() =>
                        toggleBoardStatus(board.id, board.isActive)
                      }
                      className={`${
                        board.isActive
                          ? "text-yellow-400 hover:text-yellow-300"
                          : "text-green-400 hover:text-green-300"
                      }`}
                    >
                      {board.isActive ? "비활성화" : "활성화"}
                    </button>
                    <button
                      onClick={() => deleteBoard(board.id)}
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
