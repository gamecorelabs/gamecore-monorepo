import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useUserStore } from "@/store/userStore";
import { useProfileEditStore } from "@/store/profileEditStore";

const NickNameEdit = () => {
  const user = useUserStore((state) => state.user);
  const { nickname, nicknameCheckStatus, setNickname, checkNickname } =
    useProfileEditStore();

  const handleNicknameCheck = () => {
    if (user?.type === "user") {
      checkNickname(user.userAccount.nickname);
    }
  };
  return (
    <div
      className="border rounded-lg p-6 mb-6"
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--border-color)",
      }}
    >
      <h2
        className="text-lg font-semibold mb-4"
        style={{ color: "var(--text-color)" }}
      >
        닉네임
      </h2>

      <div className="flex items-center gap-3 mb-2">
        <div className="flex-1">
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2"
            style={{
              borderColor:
                nicknameCheckStatus === "unavailable"
                  ? "var(--danger-color)"
                  : "var(--border-color)",
              backgroundColor: "var(--input-bg)",
              color: "var(--text-color)",
            }}
            placeholder="닉네임을 입력하세요"
          />
        </div>

        <button
          onClick={handleNicknameCheck}
          disabled={
            !nickname ||
            (user?.type === "user" && nickname === user.userAccount.nickname) ||
            nicknameCheckStatus === "checking"
          }
          className="px-4 py-2 text-sm rounded disabled:opacity-50 flex-shrink-0"
          style={{
            backgroundColor: "var(--primary-color)",
            color: "white",
          }}
        >
          중복 확인
        </button>
      </div>

      {/* 중복 확인 상태 표시 - 별도 줄 */}
      <div className="text-sm min-h-[1.25rem]">
        {nicknameCheckStatus === "checking" && (
          <span style={{ color: "var(--text-muted)" }}>확인 중...</span>
        )}
        {nicknameCheckStatus === "available" && (
          <span style={{ color: "var(--success-color)" }}>
            <CheckIcon className="w-4 h-4 inline mr-1" />
            사용 가능한 닉네임입니다.
          </span>
        )}
        {nicknameCheckStatus === "unavailable" && (
          <span style={{ color: "var(--danger-color)" }}>
            <XMarkIcon className="w-4 h-4 inline mr-1" />
            이미 사용 중인 닉네임입니다.
          </span>
        )}
      </div>
    </div>
  );
};

export default NickNameEdit;
