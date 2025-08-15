"use client";
import { useState, useRef, useCallback } from "react";
import { Editor } from "@tiptap/react";
import TiptapEditor from "./parts/TiptapEditor";
import TiptapImageManager from "./parts/TiptapImageManager";
import { uploadImage } from "@/utils/post/ImageUpload";
import { ResourceType } from "@/types/common/resource.types";

interface TiptapEditorWithImageManagerProps {
  resource: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (content: string) => void;
  className?: string;
}

const TiptapEditorWithImageManager = ({
  resource,
  defaultValue = "",
  placeholder = "내용을 입력하세요",
  onChange,
  className = "",
}: TiptapEditorWithImageManagerProps) => {
  const [images, setImages] = useState<string[]>([]);
  const editorRef = useRef<Editor | null>(null);

  // 초기 이미지 추출
  const extractImagesFromHTML = (html: string): string[] => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const imgElements = doc.querySelectorAll("img");
    return Array.from(imgElements).map((img) => img.src);
  };

  // 에디터 레퍼런스 설정 (최초 한번만)
  const handleEditorReady = useCallback(
    (editor: Editor) => {
      if (editorRef.current !== editor) {
        editorRef.current = editor;
        // 초기 이미지 설정
        const initialImages = extractImagesFromHTML(defaultValue);
        setImages(initialImages);
      }
    },
    [defaultValue]
  );

  // 이미지 추가 핸들러
  const handleImageAdd = useCallback((src: string) => {
    setImages((prev) => {
      if (!prev.includes(src)) {
        return [...prev, src];
      }
      return prev;
    });
  }, []);

  // 이미지 삭제 핸들러
  const handleImageDelete = useCallback((src: string) => {
    setImages((prev) => prev.filter((img) => img !== src));
  }, []);

  // 이미지 매니저에서 이미지 삭제 시 에디터에서도 삭제
  const handleDeleteFromManager = useCallback(
    (targetSrc: string) => {
      if (!editorRef.current) return;

      const { state, view } = editorRef.current;
      const { tr } = state;
      let deletionMade = false;

      // 문서를 순회하며 해당 src를 가진 이미지 노드 찾아 삭제
      state.doc.descendants((node, pos) => {
        if (node.type.name === "image" && node.attrs.src === targetSrc) {
          tr.delete(pos, pos + node.nodeSize);
          deletionMade = true;
          return false; // 첫 번째 매치만 삭제
        }
      });

      if (deletionMade) {
        view.dispatch(tr);
        editorRef.current.commands.focus();
        // 이미지 목록에서도 제거
        handleImageDelete(targetSrc);
      }
    },
    [handleImageDelete]
  );

  // 이미지 매니저에서 이미지 추가 시 에디터에도 추가
  const handleAddFromManager = useCallback(
    async (files: File[]) => {
      if (!editorRef.current) return;

      for (const file of files) {
        try {
          // 임시 업로드
          const { imageUrl } = await uploadImage(resource, file);

          editorRef.current?.chain().focus().setImage({ src: imageUrl }).run();
          handleImageAdd(imageUrl);
        } catch (error) {
          console.error("이미지 업로드 실패:", error);
        }
      }
    },
    [handleImageAdd]
  );

  return (
    <div className="space-y-4">
      <TiptapEditor
        resource={resource}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={onChange}
        onImageAdd={handleImageAdd}
        onImageDelete={handleImageDelete}
        className={className}
        onEditorReady={handleEditorReady}
      />
      <TiptapImageManager
        images={images}
        onDeleteImage={handleDeleteFromManager}
        onAddImages={handleAddFromManager}
      />
    </div>
  );
};

export default TiptapEditorWithImageManager;
