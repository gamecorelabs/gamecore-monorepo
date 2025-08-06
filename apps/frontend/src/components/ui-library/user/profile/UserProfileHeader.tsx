const UserProfileHeader = () => {
  return (
    <div className="mb-8">
      <h1
        className="text-2xl font-bold mb-2"
        style={{ color: "var(--text-color)" }}
      >
        내 프로필
      </h1>
      <p style={{ color: "var(--text-secondary)" }}>
        프로필 정보를 수정할 수 있습니다.
      </p>
    </div>
  );
};

export default UserProfileHeader;
