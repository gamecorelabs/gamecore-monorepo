import { ResourceType } from "@/types/common/resource.types";
import dataApi from "@/utils/common-axios/dataApi";

const FILE_SIZE = 1 * 1024 * 1024; // 1MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif"];

// 임시 이미지 업로드 응답 타입
export interface ImageUploadResponse {
  imageUrl: string;
}

// 임시 이미지 업로드 함수
export const uploadImage = async (
  resource: string,
  file: File
): Promise<ImageUploadResponse> => {
  const formData = new FormData();
  formData.append("ImageData", file);

  try {
    const fileAllowed = fileAllowedCheck(file);
    if (!fileAllowed.result) {
      throw new Error(fileAllowed.message);
    }

    const response = await dataApi.post(`/${resource}/images/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    return {
      imageUrl: response.data.imageUrl,
    };
  } catch (error) {
    window.alert(error);
    throw new Error("이미지 업로드에 실패했습니다.");
  }
};

export const fileAllowedCheck = (
  file: File
): {
  result: boolean;
  message?: string;
} => {
  // 파일 타입 체크 (이미지 파일만 허용)
  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      result: false,
      message:
        "지원하지 않는 파일 형식입니다. JPG, PNG, GIF 파일만 업로드 가능합니다.",
    };
  }

  // 파일 크기 체크
  if (file.size > FILE_SIZE) {
    return {
      result: false,
      message: "파일 크기가 너무 큽니다. 최대 1MB 이하로 업로드해주세요.",
    };
  }

  return {
    result: true,
  };
};
