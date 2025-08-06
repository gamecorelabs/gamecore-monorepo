import { UserIcon, CameraIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";
import { useProfileEditStore } from "@/store/profileEditStore";

const ProfilePhotoEdit = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { profileImage, handleImageUpload, handleImageRemove } =
    useProfileEditStore();

  const onImageRemove = () => {
    handleImageRemove();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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
        프로필 사진
      </h2>

      <div className="flex items-center gap-6">
        {/* 프로필 이미지 미리보기 */}
        <div className="relative">
          <div
            className="w-24 h-24 rounded-full overflow-hidden border-2 flex items-center justify-center"
            style={{ borderColor: "var(--border-color)" }}
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt="프로필 사진"
                className="w-full h-full object-cover"
              />
            ) : (
              <UserIcon
                className="w-12 h-12"
                style={{ color: "var(--text-muted)" }}
              />
            )}
          </div>

          {/* 업로드 버튼 */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-2 flex items-center justify-center"
            style={{
              backgroundColor: "var(--primary-color)",
              borderColor: "var(--card-bg)",
              color: "white",
            }}
          >
            <CameraIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1">
          <p
            className="text-sm mb-2"
            style={{ color: "var(--text-secondary)" }}
          >
            JPG, JPEG, PNG 파일을 업로드할 수 있습니다. (최대 1MB, 48x48 사이즈
            권장)
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 text-sm rounded border"
              style={{
                borderColor: "var(--border-color)",
                color: "var(--text-color)",
              }}
            >
              사진 선택
            </button>

            {profileImage && (
              <button
                onClick={onImageRemove}
                className="px-4 py-2 text-sm rounded"
                style={{
                  backgroundColor: "var(--danger-color)",
                  color: "white",
                }}
              >
                제거
              </button>
            )}
          </div>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
};

export default ProfilePhotoEdit;
