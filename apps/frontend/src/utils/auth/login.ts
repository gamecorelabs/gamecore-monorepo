import authApi from "@/utils/common-axios/authApi";
import axios from "axios";

export const userLogin = async (basicToken: string) => {
  try {
    const response = await authApi.post(
      "/auth/login",
      {},
      {
        headers: {
          Authorization: `Basic ${basicToken}`,
        },
      }
    );

    if (response.status !== 201) {
      throw new Error(response.data.message || "로그인 실패");
    }

    return true;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const msg = error.response.data?.message || "서버 오류";
      window.alert(msg);
    } else {
      console.error("예상치 못한 에러", error);
    }
    return false;
  }
};
