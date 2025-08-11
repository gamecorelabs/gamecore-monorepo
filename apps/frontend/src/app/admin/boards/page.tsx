"use client";
import { Channel } from "@/types/channel/channel.types";
import {
  BoardConfig,
  BoardStatus,
  BoardType,
  MappingBoardState,
  MappingBoardType,
} from "@/types/board/boardConfig.types";

import adminApi from "@/utils/common-axios/adminApi";
import { useEffect, useState } from "react";

const initFormData = {
  title: "",
  description: "",
  status: BoardStatus.ACTIVE,
  type: BoardType.FREE,
  channel: "",
};

export default function BoardManagement() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [boards, setBoards] = useState<BoardConfig[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState(initFormData);

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
    try {
      const response = await adminApi.get("/config/board");
      setBoards(response.data);
    } catch (error) {
      console.error("Failed to load boards:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const channelId = formData.channel;
      if (!channelId) {
        window.alert("채널을 선택해주세요.");
        return;
      }

      if (!Object.values(BoardStatus).includes(formData.status)) {
        window.alert("잘못된 게시판 상태입니다.");
        return;
      }

      if (!Object.values(BoardType).includes(formData.type)) {
        window.alert("잘못된 게시판 스킨입니다.");
        return;
      }

      if (!formData.title) {
        window.alert("게시판 이름은 필수입니다.");
        return;
      }

      await adminApi.post(`/config/channel/${channelId}/board`, {
        title: formData.title,
        description: formData.description,
        status: formData.status,
        type: formData.type,
      });
    } catch (error) {
      console.error("Failed to create board:", error);
      window.alert("게시판 생성에 실패했습니다. 다시 시도해주세요.");
    } finally {
      resetForm();
      loadBoards();
    }
  };

  const resetForm = () => {
    setShowAddForm(false);
    setFormData(initFormData);
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  게시판 상태
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value as BoardStatus,
                    })
                  }
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  required
                >
                  {Object.entries(BoardStatus).map(([key, value]) => (
                    <option key={key} value={value}>
                      {MappingBoardState[value]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  게시판 스킨
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      type: e.target.value as BoardType,
                    })
                  }
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  required
                >
                  {Object.entries(BoardType).map(([key, value]) => (
                    <option key={key} value={value}>
                      {MappingBoardType[value]}
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
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
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
                  ID
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
                    {board.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {board.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {board.channel?.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full`}
                    >
                      {board.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {board.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
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
