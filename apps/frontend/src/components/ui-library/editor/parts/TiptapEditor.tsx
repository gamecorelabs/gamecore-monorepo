"use client";
import React, { useEffect, useState } from "react";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import TiptapToolbar from "./TiptapToolbar";
import { uploadImage } from "@/utils/post/ImageUpload";
import { ResourceType } from "@/types/common/resource.types";

interface TiptapEditorProps {
  resource: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (content: string) => void;
  onImageAdd?: (src: string) => void;
  onImageDelete?: (src: string) => void;
  onEditorReady?: (editor: Editor) => void;
  className?: string;
}

const TiptapEditor = ({
  resource,
  defaultValue = "",
  placeholder = "내용을 입력하세요",
  onChange,
  onImageAdd,
  onImageDelete,
  onEditorReady,
  className = "",
}: TiptapEditorProps) => {
  const [content, setContent] = useState(defaultValue);
  const [uploadingImages, setUploadingImages] = useState(new Set<string>());

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
        inline: false, // 블록 레벨 요소로 처리
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
    onUpdate: ({ editor, transaction }) => {
      const html = editor.getHTML();
      setContent(html); // hidden input용 상태 업데이트
      onChange?.(html);

      // 이미지 추가/삭제 감지
      if (transaction.docChanged) {
        transaction.steps.forEach((step) => {
          const stepMap = step.getMap();
          stepMap.forEach((oldStart, oldEnd, newStart, newEnd) => {
            // 새로 추가된 노드 확인
            if (newEnd > newStart) {
              editor.state.doc.nodesBetween(newStart, newEnd, (node) => {
                if (node.type.name === "image" && node.attrs.src) {
                  onImageAdd?.(node.attrs.src);
                }
              });
            }
            // 삭제된 노드 확인 (이전 상태에서 체크)
            if (oldEnd > oldStart) {
              const oldDoc = transaction.before;
              oldDoc.nodesBetween(oldStart, oldEnd, (node) => {
                if (node.type.name === "image" && node.attrs.src) {
                  // 현재 문서에서 해당 이미지가 없는지 확인
                  let imageExists = false;
                  editor.state.doc.descendants((currentNode) => {
                    if (
                      currentNode.type.name === "image" &&
                      currentNode.attrs.src === node.attrs.src
                    ) {
                      imageExists = true;
                      return false;
                    }
                  });
                  if (!imageExists) {
                    onImageDelete?.(node.attrs.src);
                  }
                }
              });
            }
          });
        });
      }
    },
    editorProps: {
      attributes: {
        class: "min-h-[200px] p-4 focus:outline-none prose max-w-none",
        style: "color: var(--text-color); background-color: var(--input-bg);",
      },
      handleDrop: (view, event, slice, moved) => {
        // 드래그 앤 드롭 이미지 처리
        if (
          !moved &&
          event.dataTransfer &&
          event.dataTransfer.files.length > 0
        ) {
          const files = Array.from(event.dataTransfer.files);
          const imageFiles = files.filter((file) =>
            file.type.startsWith("image/")
          );

          if (imageFiles.length > 0) {
            event.preventDefault();

            // 드롭 위치 계산
            const coordinates = view.posAtCoords({
              left: event.clientX,
              top: event.clientY,
            });

            if (coordinates) {
              imageFiles.forEach(async (file) => {
                const fileId = `${file.name}_${Date.now()}`;
                try {
                  // 로딩 상태 추가
                  setUploadingImages((prev) => new Set(prev).add(fileId));

                  // 임시 업로드
                  const { imageUrl } = await uploadImage(resource, file);

                  // 드롭 위치에 이미지 삽입
                  view.dispatch(
                    view.state.tr.insert(
                      coordinates.pos,
                      view.state.schema.nodes.image.create({ src: imageUrl })
                    )
                  );
                  onImageAdd?.(imageUrl);

                  // 로딩 상태 제거
                  setUploadingImages((prev) => {
                    const next = new Set(prev);
                    next.delete(fileId);
                    return next;
                  });
                } catch (error) {
                  console.error("이미지 업로드 실패:", error);
                  // 로딩 상태 제거
                  setUploadingImages((prev) => {
                    const next = new Set(prev);
                    next.delete(fileId);
                    return next;
                  });
                }
              });
            }

            return true; // 기본 동작 막기
          }
        }
        return false; // 기본 동작 허용
      },
      handlePaste: (view, event) => {
        // 클립보드에서 이미지 붙여넣기 처리
        const items = Array.from(event.clipboardData?.items || []);
        const imageItems = items.filter((item) =>
          item.type.startsWith("image/")
        );

        if (imageItems.length > 0) {
          event.preventDefault();

          imageItems.forEach(async (item) => {
            const file = item.getAsFile();
            if (file) {
              try {
                // 로딩 상태 추가
                const fileId = `${file.name}_${Date.now()}`;
                setUploadingImages((prev) => new Set(prev).add(fileId));

                // 임시 업로드
                const { imageUrl } = await uploadImage(resource, file);

                editor?.chain().focus().setImage({ src: imageUrl }).run();
                onImageAdd?.(imageUrl);

                // 로딩 상태 제거
                setUploadingImages((prev) => {
                  const next = new Set(prev);
                  next.delete(fileId);
                  return next;
                });
              } catch (error) {
                console.error("이미지 업로드 실패:", error);
                // 로딩 상태 제거
                const fileIdToRemove = `${file.name}_${Date.now()}`;
                setUploadingImages((prev) => {
                  const next = new Set(prev);
                  next.delete(fileIdToRemove);
                  return next;
                });
              }
            }
          });

          return true; // 기본 동작 막기
        }
        return false; // 기본 동작 허용
      },
    },
  });

  // defaultValue 변경 시 에디터 내용 업데이트 및 에디터 준비 콜백
  useEffect(() => {
    if (editor) {
      // 에디터 준비 콜백 실행
      onEditorReady?.(editor);

      // defaultValue 업데이트
      if (defaultValue && editor.getHTML() !== defaultValue) {
        editor.commands.setContent(defaultValue);
        setContent(defaultValue);
      }
    }
  }, [defaultValue, editor, onEditorReady]);

  // 드래그 앤 드롭 시각적 피드백을 위한 이벤트 리스너
  useEffect(() => {
    if (!editor) return;

    const editorElement = editor.view.dom;

    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault();
      if (e.dataTransfer?.items) {
        const hasImageFile = Array.from(e.dataTransfer.items).some(
          (item) => item.kind === "file" && item.type.startsWith("image/")
        );
        if (hasImageFile) {
          editorElement.classList.add("drag-over");
        }
      }
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      // 에디터 영역을 완전히 벗어났는지 확인
      if (!editorElement.contains(e.relatedTarget as Node)) {
        editorElement.classList.remove("drag-over");
      }
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
    };

    const handleDrop = () => {
      editorElement.classList.remove("drag-over");
    };

    editorElement.addEventListener("dragenter", handleDragEnter);
    editorElement.addEventListener("dragleave", handleDragLeave);
    editorElement.addEventListener("dragover", handleDragOver);
    editorElement.addEventListener("drop", handleDrop);

    return () => {
      editorElement.removeEventListener("dragenter", handleDragEnter);
      editorElement.removeEventListener("dragleave", handleDragLeave);
      editorElement.removeEventListener("dragover", handleDragOver);
      editorElement.removeEventListener("drop", handleDrop);
    };
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className={`relative border rounded-lg overflow-hidden ${className}`}>
      <TiptapToolbar editor={editor} />

      <EditorContent editor={editor} />

      {/* 업로드 상태 표시 */}
      {uploadingImages.size > 0 && (
        <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs">
          이미지 업로드 중... ({uploadingImages.size}개)
        </div>
      )}

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

        /* 드래그 앤 드롭 스타일 */
        .ProseMirror.drag-over {
          background-color: var(--card-bg);
          border: 2px dashed var(--primary-color);
          opacity: 0.8;
        }

        .ProseMirror.drag-over::after {
          content: "이미지를 여기에 드롭하세요";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: var(--primary-color);
          font-size: 16px;
          font-weight: bold;
          pointer-events: none;
          z-index: 10;
        }
      `}</style>
    </div>
  );
};

export default TiptapEditor;
