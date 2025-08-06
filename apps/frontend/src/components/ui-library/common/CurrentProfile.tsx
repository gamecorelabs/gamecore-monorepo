import { UserAccount } from "@/types/user/user.types";
import Image from "next/image";

export const CurrentProfile = ({
  user,
  width = 32,
  height = 32,
}: {
  user: UserAccount;
  width?: number;
  height?: number;
}) => {
  const containerStyle = {
    width: `${width}px`,
    height: `${height}px`,
    ...(user.profileImage
      ? {}
      : {
          backgroundColor: "var(--primary-color)",
          color: "white",
        }),
  };

  return (
    <div
      className="rounded-full flex items-center justify-center text-lg font-bold"
      style={containerStyle}
    >
      {user.profileImage ? (
        <Image
          src={`${process.env.NEXT_PUBLIC_S3_URL}/${user.profileImage}`}
          alt="프로필 이미지"
          className="rounded-full"
          width={width}
          height={height}
        />
      ) : (
        user.nickname.charAt(0)
      )}
    </div>
  );
};

export default CurrentProfile;
