"use client";
import { useEffect } from "react";
import { useUserStore } from "@/store/userStore";
import { useProfileEditStore } from "@/store/profileEditStore";
import ProfilePhotoEdit from "./parts/ProfilePhotoEdit";
import NickNameEdit from "./parts/NickNameEdit";
import useHydrated from "@/utils/hooks/useHydrated";
import { FallbackPage } from "../../fallback";
import authApi from "@/utils/common-axios/authApi";
import { AxiosError, HttpStatusCode } from "axios";
import { useRouter } from "next/navigation";

const UserProfileForm = () => {
  const router = useRouter();
  const hydrated = useHydrated();
  const user = useUserStore((state) => state.user);
  const {
    nickname,
    profileImageFile,
    nicknameCheckStatus,
    initializeProfile,
    reset,
  } = useProfileEditStore();

  // 컴포넌트 마운트 시 사용자 정보로 초기화
  useEffect(() => {
    if (user?.type === "user") {
      initializeProfile(user.userAccount);
    }

    // 컴포넌트 언마운트 시 상태 초기화
    return () => {
      reset();
    };
  }, [user, initializeProfile, reset]);

  const handleSave = async () => {
    if (user?.type !== "user") {
      window.alert("사용자 정보가 없습니다. 다시 로그인해주세요.");
      return;
    }

    // 닉네임이 변경되었다면, 반드시 status는 avaliable이어야 함
    if (
      user.userAccount.nickname !== nickname &&
      nicknameCheckStatus !== "available"
    ) {
      window.alert("닉네임 변경 후 중복확인 하지 않았습니다.");
      return;
    }

    try {
      // FormData로 파일과 다른 데이터를 함께 전송
      const formData = new FormData();
      formData.append("nickname", nickname);

      if (profileImageFile) {
        formData.append("profileImageFile", profileImageFile);
      }

      const result = await authApi.post("/user/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (result.status === HttpStatusCode.Created) {
        window.alert("프로필이 성공적으로 저장되었습니다.");
        router.refresh();
      }
    } catch (error) {
      let errorMessage = "프로필 업데이트 중 오류가 발생했습니다.";

      const axiosError = error as AxiosError<any>;
      if (axiosError?.response?.data?.message) {
        errorMessage = axiosError.response.data.message;
      } else if (axiosError?.message) {
        errorMessage = axiosError.message;
      }

      window.alert(errorMessage);
    }
  };

  if (!hydrated) {
    return null;
  }

  if (!user || user.type !== "user") {
    return (
      <FallbackPage
        message="로그인이 필요합니다"
        redirectTo="/user/auth/login/"
        delay={2000}
      />
    );
  }
  return (
    <>
      <NickNameEdit />
      <ProfilePhotoEdit />

      {/* 저장 버튼 */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={
            nicknameCheckStatus === "unavailable" ||
            nicknameCheckStatus === "checking"
          }
          className="px-6 py-3 rounded font-medium disabled:opacity-50"
          style={{
            backgroundColor: "var(--primary-color)",
            color: "white",
          }}
        >
          변경사항 저장
        </button>
      </div>
    </>
  );
};

export default UserProfileForm;
