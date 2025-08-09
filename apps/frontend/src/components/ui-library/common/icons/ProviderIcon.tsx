import { ProviderType } from "@/types/user/user.types";
import {
  FaDiscord,
  FaGoogle,
  FaFacebook,
  FaTwitter,
  FaGithub,
  FaInstagram,
  FaApple,
} from "react-icons/fa";
import { SiKakao, SiNaver } from "react-icons/si";

interface ProviderIconProps {
  type: ProviderType;
  size?: number;
  className?: string;
}

const ProviderIcon = ({
  type,
  size = 20,
  className = "",
}: ProviderIconProps) => {
  const iconProps = { size, className };

  switch (type) {
    case ProviderType.DISCORD:
      return <FaDiscord {...iconProps} style={{ color: "#5865F2" }} />;
    case ProviderType.GOOGLE:
      return <FaGoogle {...iconProps} style={{ color: "#DB4437" }} />;
    case ProviderType.KAKAO:
      return <SiKakao {...iconProps} style={{ color: "#FFCD00" }} />;
    case ProviderType.NAVER:
      return <SiNaver {...iconProps} style={{ color: "#03C75A" }} />;
    case ProviderType.APPLE:
      return <FaApple {...iconProps} style={{ color: "#000000" }} />;
    case ProviderType.FACEBOOK:
      return <FaFacebook {...iconProps} style={{ color: "#1877F2" }} />;
    case ProviderType.TWITTER:
      return <FaTwitter {...iconProps} style={{ color: "#1DA1F2" }} />;
    case ProviderType.GITHUB:
      return <FaGithub {...iconProps} style={{ color: "#181717" }} />;
    case ProviderType.INSTAGRAM:
      return <FaInstagram {...iconProps} style={{ color: "#E4405F" }} />;
    default:
      return null;
  }
};

export default ProviderIcon;
