import authApi from "@gamecoregg/utils/common-axios/src/authApi";

export const userLogout = async () => {
  if (window.confirm("정말 로그아웃 하시겠습니까?")) {
    try {
      const result = await authApi.post(
        "/auth/logout",
        {},
        { withCredentials: true }
      );

      if (result.data.success) {
        window.alert("로그아웃 되었습니다.");
        return true;
      } else {
        window.alert("로그아웃 처리 중 문제가 발생하였습니다.");
        return false;
      }
    } catch (error) {
      window.alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
      return false;
    }
  }
};
