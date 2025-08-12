"use client";
import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import TiptapToolbar from "./parts/TiptapToolbar";

interface TiptapEditorProps {
  defaultValue?: string;
  placeholder?: string;
  onChange?: (content: string) => void;
  className?: string;
}

const TiptapEditor = ({
  defaultValue = "",
  placeholder = "내용을 입력하세요",
  onChange,
  className = "",
}: TiptapEditorProps) => {
  const [content, setContent] = useState(defaultValue);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: {
          HTMLAttributes: {
            style: "font-weight: bold;",
          },
        },
        italic: {
          HTMLAttributes: {
            style: "font-style: italic;",
          },
        },
      }),
      Underline,
      Image.configure({
        HTMLAttributes: {
          style:
            "max-width: 100%; height: auto; margin: 10px 0; border-radius: 4px;",
        },
        allowBase64: true, // base64 이미지 허용
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          style: "color: var(--primary-color); text-decoration: underline;",
        },
      }),
      Placeholder.configure({
        placeholder,
        emptyEditorClass: "is-editor-empty",
      }),
    ],
    content: defaultValue,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setContent(html); // hidden input용 상태 업데이트
      onChange?.(html);
    },
    editorProps: {
      attributes: {
        class: "min-h-[200px] p-4 focus:outline-none prose max-w-none",
        style: "color: var(--text-color); background-color: var(--input-bg);",
      },
    },
  });

  // defaultValue 변경 시 에디터 내용 업데이트
  useEffect(() => {
    if (editor && defaultValue && editor.getHTML() !== defaultValue) {
      editor.commands.setContent(defaultValue);
      setContent(defaultValue); // 상태도 함께 업데이트
    }
  }, [defaultValue, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className={`border rounded-lg overflow-hidden ${className}`}>
      <TiptapToolbar editor={editor} />

      <EditorContent editor={editor} />

      {/* 폼 제출을 위한 숨겨진 필드 */}
      <input type="hidden" name="content" value={content} />

      <style jsx global>{`
        /* Placeholder 스타일 */
        .ProseMirror .is-editor-empty:first-child::before {
          color: var(--text-muted);
          opacity: 0.7;
          float: left;
          height: 0;
          pointer-events: none;
        }

        /* 기본 텍스트 스타일링 */
        .ProseMirror {
          outline: none;
        }

        .ProseMirror p {
          margin: 8px 0;
        }

        .ProseMirror p:first-child {
          margin-top: 0;
        }

        .ProseMirror p:last-child {
          margin-bottom: 0;
        }

        .ProseMirror strong {
          font-weight: bold;
        }

        .ProseMirror em {
          font-style: italic;
        }

        .ProseMirror u {
          text-decoration: underline;
        }

        /* 이미지 스타일 */
        .ProseMirror img {
          max-width: 100%;
          height: auto;
          margin: 10px 0;
          border-radius: 4px;
          cursor: pointer;
        }

        .ProseMirror img.ProseMirror-selectednode {
          outline: 2px solid var(--primary-color);
        }

        /* 리스트 스타일 */
        .ProseMirror ul,
        .ProseMirror ol {
          margin: 12px 0;
          padding-left: 24px;
        }

        .ProseMirror li {
          margin: 4px 0;
        }

        /* 블록 인용문 스타일 */
        .ProseMirror blockquote {
          margin: 16px 0;
          padding: 12px 16px;
          border-left: 4px solid var(--primary-color);
          background-color: var(--card-bg);
          font-style: italic;
        }

        /* 코드 블록 스타일 */
        .ProseMirror code {
          background-color: var(--card-bg);
          padding: 2px 4px;
          border-radius: 2px;
          font-family: "Courier New", monospace;
        }

        .ProseMirror pre {
          background-color: var(--card-bg);
          padding: 12px;
          border-radius: 4px;
          overflow-x: auto;
        }

        .ProseMirror pre code {
          background: none;
          padding: 0;
        }
      `}</style>
    </div>
  );
};

export default TiptapEditor;
