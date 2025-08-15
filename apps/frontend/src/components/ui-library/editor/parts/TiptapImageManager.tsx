"use client";
import React, { useRef } from "react";
import { TrashIcon, PhotoIcon, PlusIcon } from "@heroicons/react/24/outline";

interface TiptapImageManagerProps {
  images: string[];
  onDeleteImage: (src: string) => void;
  onAddImages: (files: File[]) => void;
}

const TiptapImageManager = ({ images, onDeleteImage, onAddImages }: TiptapImageManagerProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 파일 선택 핸들러
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const imageFiles = Array.from(files).filter(file => 
        file.type.startsWith('image/')
      );
      
      if (imageFiles.length > 0) {
        onAddImages(imageFiles);
      }
      
      // 파일 입력 초기화
      event.target.value = '';
    }
  };

  // 파일 선택 버튼 클릭
  const handleAddClick = () => {
    fileInputRef.current?.click();
  };

  // 이미지 썸네일 생성
  const getThumbnail = (src: string) => {
    if (src.startsWith('data:')) {
      return src; // base64 이미지는 그대로 사용
    }
    return src; // URL 이미지도 그대로 사용 (필요시 썸네일 서비스 URL로 변경)
  };


  return (
    <div className="w-full p-4 border rounded-lg" style={{ borderColor: "var(--border-color)" }}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-color)" }}>
          이미지 관리 ({images.length})
        </h3>
        <button
          type="button"
          onClick={handleAddClick}
          className="p-1 rounded hover:bg-opacity-50 transition-colors"
          style={{ 
            backgroundColor: "var(--primary-color)",
            color: "white"
          }}
          title="이미지 추가"
        >
          <PlusIcon className="w-4 h-4" />
        </button>
      </div>

      {/* 숨겨진 파일 입력 */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {images.length === 0 ? (
        <div 
          className="flex flex-col items-center justify-center py-8 text-center"
          style={{ color: "var(--text-muted)" }}
        >
          <PhotoIcon className="w-8 h-8 mb-2 opacity-50" />
          <p className="text-xs">
            이미지를 추가해보세요
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 max-h-96 overflow-y-auto">
          {images.map((src, index) => (
            <div
              key={`${src}-${index}`}
              className="group relative bg-gray-50 rounded-lg overflow-hidden"
              style={{ backgroundColor: "var(--card-bg)" }}
            >
              {/* 이미지 썸네일 */}
              <div className="aspect-square w-full">
                <img
                  src={getThumbnail(src)}
                  alt={`이미지 ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // 이미지 로드 실패 시 placeholder 표시
                    const target = e.target as HTMLImageElement;
                    target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMiAxMkM5Ljc5IDEyIDggMTAuMjEgOCA4UzkuNzkgNCAxMiA0IDE2IDUuNzkgMTYgOCAxNC4yMSAxMiAxMiAxMlpNMTIgMTRMMTYgMThIOEwxMiAxNFoiIGZpbGw9IiM5Q0E0QUYiLz4KPC9zdmc+";
                  }}
                />
              </div>

              {/* 삭제 버튼 */}
              <button
                type="button"
                onClick={() => onDeleteImage(src)}
                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                title="이미지 삭제"
              >
                <TrashIcon className="w-3 h-3" />
              </button>

              {/* 이미지 정보 */}
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1">
                <div className="truncate">
                  이미지 {index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        /* 스크롤바 스타일링 */
        .grid::-webkit-scrollbar {
          width: 4px;
        }
        
        .grid::-webkit-scrollbar-track {
          background: var(--card-bg);
        }
        
        .grid::-webkit-scrollbar-thumb {
          background: var(--border-color);
          border-radius: 2px;
        }
        
        .grid::-webkit-scrollbar-thumb:hover {
          background: var(--text-muted);
        }
      `}</style>
    </div>
  );
};

export default TiptapImageManager;