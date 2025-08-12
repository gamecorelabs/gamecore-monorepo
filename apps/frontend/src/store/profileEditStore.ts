import { create } from "zustand";
import authApi from "@/utils/common-axios/authApi";
import { UserAccount } from "@/types/user/user.types";
import { S3_URL } from "@/config/config";

interface ProfileEditState {
  // 닉네임 관련
  nickname: string;
  nicknameCheckStatus: "idle" | "checking" | "available" | "unavailable";

  // 프로필 사진 관련
  profileImage: string | null;
  profileImageFile: File | null;
  isImageRemoved: boolean;

  // Actions
  setNickname: (nickname: string) => void;
  setNicknameCheckStatus: (
    status: "idle" | "checking" | "available" | "unavailable"
  ) => void;
  checkNickname: (currentUserNickname?: string) => Promise<void>;

  setProfileImage: (image: string | null) => void;
  setProfileImageFile: (file: File | null) => void;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageRemove: () => void;

  // 초기화
  initializeProfile: (user: UserAccount) => void;
  reset: () => void;
}

export const useProfileEditStore = create<ProfileEditState>((set, get) => ({
  // Initial state
  nickname: "",
  nicknameCheckStatus: "idle",
  profileImage: null,
  profileImageFile: null,
  isImageRemoved: false,

  // Nickname actions
  setNickname: (nickname) => {
    set({ nickname, nicknameCheckStatus: "idle" });
  },

  setNicknameCheckStatus: (status) => {
    set({ nicknameCheckStatus: status });
  },

  checkNickname: async (currentUserNickname) => {
    const { nickname } = get();

    if (!nickname || nickname === currentUserNickname) {
      set({ nicknameCheckStatus: "idle" });
      return;
    }

    set({ nicknameCheckStatus: "checking" });

    try {
      const response = await authApi.get(
        `/user/profile/nickname?nickname=${nickname}`
      );
      // 조회 결과가 있으면 true, 없으면 false
      set({
        nicknameCheckStatus: response.data ? "unavailable" : "available",
      });
    } catch {
      set({ nicknameCheckStatus: "unavailable" });
    }
  },

  // Profile image actions
  setProfileImage: (image) => set({ profileImage: image }),

  setProfileImageFile: (file) => set({ profileImageFile: file }),

  handleImageUpload: (event) => {
    const file = event.target.files?.[0];
    if (file) {
      // 파일 확장자 검증 (jpg, jpeg, png만 허용)
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        alert("JPG, JPEG, PNG 파일만 업로드 가능합니다.");
        event.target.value = ""; // input 초기화
        return;
      }

      // 파일 크기 검증 (1MB 이하만 허용)
      const maxSize = 1024 * 1024;
      if (file.size > maxSize) {
        alert("파일 크기는 1MB 이하만 업로드 가능합니다.");
        event.target.value = ""; // input 초기화
        return;
      }

      set({ profileImageFile: file, isImageRemoved: false });

      const reader = new FileReader();
      reader.onload = (e) => {
        set({ profileImage: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  },

  handleImageRemove: () => {
    set({
      profileImage: null,
      profileImageFile: null,
      isImageRemoved: true,
    });

    // 파일 입력 초기화는 컴포넌트에서 처리
  },

  // Utility actions
  initializeProfile: (user) => {
    set({
      nickname: user.nickname || "",
      nicknameCheckStatus: "idle",
      profileImage: user.profileImage ? `${S3_URL}/${user.profileImage}` : null,
      profileImageFile: null,
      isImageRemoved: false,
    });
  },

  reset: () => {
    set({
      nickname: "",
      nicknameCheckStatus: "idle",
      profileImage: null,
      profileImageFile: null,
      isImageRemoved: false,
    });
  },
}));
