const GuestAuthorFields = ({
  isEditMode,
  guestInfo,
}: {
  isEditMode: boolean;
  guestInfo?: {
    guestAuthorId: string;
    guestAuthorPassword: string;
  };
}) => {
  return (
    <div className="flex mb-4 w-full gap-4 flex-col xs:flex-row">
      <div className="flex-1">
        <label htmlFor="guestAuthorId" className="block font-semibold mb-2">
          아이디 (비회원)
        </label>
        <input
          id="guestAuthorId"
          name="guestAuthorId"
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
          style={{
            color: "var(--text-color)",
            backgroundColor: "var(--input-bg)",
          }}
          placeholder="아이디를 입력하세요"
          defaultValue={guestInfo?.guestAuthorId}
          readOnly={isEditMode}
        />
      </div>
      <div className="flex-1">
        <label
          htmlFor="guestAuthorPassword"
          className="block font-semibold mb-2"
        >
          비밀번호 (비회원)
        </label>
        <input
          name="guestAuthorPassword"
          type="password"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          style={{
            color: "var(--text-color)",
            backgroundColor: "var(--input-bg)",
          }}
          placeholder="비밀번호를 입력하세요"
          defaultValue={guestInfo?.guestAuthorPassword}
          readOnly={isEditMode}
        />
      </div>
    </div>
  );
};

export default GuestAuthorFields;
