"use client";
import React from "react";
import { Editor } from "@tiptap/react";
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  PhotoIcon,
  LinkIcon,
  ListBulletIcon,
  Bars3BottomLeftIcon,
} from "@heroicons/react/24/outline";

interface ToolbarButton {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  action: () => void;
  isActive?: () => boolean;
}

const TiptapToolbar = ({ editor }: { editor: Editor }) => {
  const formatButtons: ToolbarButton[] = [
    {
      icon: BoldIcon,
      title: "굵게",
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive("bold"),
    },
    {
      icon: ItalicIcon,
      title: "기울임",
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive("italic"),
    },
    {
      icon: UnderlineIcon,
      title: "밑줄",
      action: () => editor.chain().focus().toggleUnderline().run(),
      isActive: () => editor.isActive("underline"),
    },
  ];

  const contentButtons: ToolbarButton[] = [
    {
      icon: ListBulletIcon,
      title: "불릿 리스트",
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive("bulletList"),
    },
    {
      icon: Bars3BottomLeftIcon,
      title: "인용문",
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: () => editor.isActive("blockquote"),
    },
    {
      icon: LinkIcon,
      title: "링크 추가",
      action: () => {
        const url = window.prompt("링크 URL을 입력하세요:");
        if (url) {
          editor.chain().focus().setLink({ href: url }).run();
        }
      },
      isActive: () => editor.isActive("link"),
    },
  ];

  const ToolbarButton = ({
    icon: Icon,
    title,
    action,
    isActive,
  }: ToolbarButton) => (
    <button
      type="button"
      onClick={action}
      className={`p-2 rounded hover:bg-opacity-50 transition-colors ${
        isActive?.() ? "bg-opacity-75" : ""
      }`}
      style={{
        backgroundColor: isActive?.()
          ? "var(--primary-color)"
          : "var(--hover-bg)",
        color: isActive?.() ? "white" : "var(--text-color)",
      }}
      title={title}
    >
      <Icon className="w-4 h-4" />
    </button>
  );

  return (
    <div
      className="flex items-center gap-1 p-2 border-b flex-wrap"
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--border-color)",
      }}
    >
      {/* 텍스트 서식 버튼들 */}
      {formatButtons.map((button, index) => (
        <ToolbarButton key={`format-${index}`} {...button} />
      ))}

      <div
        className="w-px h-6 mx-2"
        style={{ backgroundColor: "var(--border-color)" }}
      />

      {/* 콘텐츠 버튼들 */}
      {contentButtons.map((button, index) => (
        <ToolbarButton key={`content-${index}`} {...button} />
      ))}

      <div
        className="w-px h-6 mx-2"
        style={{ backgroundColor: "var(--border-color)" }}
      />

      {/* 드래그 앤 드롭 안내 */}
      <div
        className="flex items-center gap-2 px-3 py-1 text-xs rounded"
        style={{
          backgroundColor: "var(--card-bg)",
          color: "var(--text-muted)",
        }}
        title="이미지를 드래그 앤 드롭하거나 Ctrl+V로 붙여넣기"
      >
        <PhotoIcon className="w-3 h-3" />
        <span>이미지 드래그 앤 드롭 지원</span>
      </div>
    </div>
  );
};

export default TiptapToolbar;
