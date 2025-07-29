"use client";
import {
  Channel,
  ChannelCategory,
  ChannelStatus,
  MappingChannelState,
} from "@/types/channel/channel.types";
import adminApi from "@/utils/common-axios/adminApi";
import { formatDate } from "@/utils/helpers/formatDate";
import { useEffect, useState } from "react";

export default function ChannelManagement() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    channel: "",
    title: "",
    category: ChannelCategory.GAME,
    status: ChannelStatus.ACTIVE,
  });

  useEffect(() => {
    loadChannels();
  }, []);

  const loadChannels = async () => {
    try {
      const response = await adminApi.get("/config/channel");
      setChannels(response.data);
    } catch (error) {
      console.error("채널 리스트 불러오기 오류", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await adminApi.post("/config/channel", formData);
    } catch (error) {
      console.error("채널 생성 오류", error);
    } finally {
      resetForm();
      loadChannels();
    }
  };

  const resetForm = () => {
    setFormData({
      channel: "",
      title: "",
      category: ChannelCategory.GAME,
      status: ChannelStatus.ACTIVE,
    });
    setShowAddForm(false);
  };

  // const toggleChannelStatus = async (id: number, isActive: boolean) => {
  //   // TODO: API 호출
  //   // try {
  //   //   await adminApi.patch(`/channels/${id}`, { isActive: !isActive });
  //   //   loadChannels();
  //   // } catch (error) {
  //   //   console.error('Failed to update channel:', error);
  //   // }

  //   console.log("Toggling channel status:", id, !isActive);
  // };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">채널 관리</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          새 채널 추가
        </button>
      </div>

      {/* 채널 추가 폼 */}
      {showAddForm && (
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">
            새 채널 추가
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  채널명
                </label>
                <input
                  type="text"
                  value={formData.channel}
                  onChange={(e) =>
                    setFormData({ ...formData, channel: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  placeholder="djmax, baram 등"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                채널 제목
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                placeholder="DJMAX Respect V"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                카테고리
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as ChannelCategory,
                  })
                }
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                required
              >
                {Object.values(ChannelCategory).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                상태
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as ChannelStatus,
                  })
                }
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                required
              >
                {Object.values(ChannelStatus).map((status) => (
                  <option key={status} value={status}>
                    {MappingChannelState[status]}
                  </option>
                ))}
              </select>
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

      {/* 채널 목록 */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">등록된 채널</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  채널명
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  채널 제목
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  상태
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  생성일
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {channels.map((channel) => (
                <tr key={channel.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                    {channel.channel === "main" ? "" : `${channel.channel}.`}
                    gamecore.co.kr
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {channel.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        channel.status === ChannelStatus.ACTIVE
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {channel.status === ChannelStatus.ACTIVE
                        ? "활성"
                        : "비활성"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {formatDate(channel.created_at)}
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
