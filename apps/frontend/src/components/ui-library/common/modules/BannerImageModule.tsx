"use client";
import Image from "next/image";
import Link from "next/link";

interface BannerImageModuleProps {
  imageUrl: string;
  alt?: string;
  href?: string;
  height?: number;
  className?: string;
  priority?: boolean;
  objectPosition?: string;
}

const BannerImageModule = ({
  imageUrl,
  alt = "배너 이미지",
  href,
  height = 200,
  className = "",
  priority = false,
  objectPosition = "center center",
}: BannerImageModuleProps) => {
  const imageElement = (
    <div
      className={`relative w-full overflow-hidden rounded-lg ${className}`}
      style={{ height: `${height}px` }}
    >
      <Image
        src={imageUrl}
        alt={alt}
        fill
        className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        priority={priority}
        sizes="100vw"
        style={{ objectPosition }}
      />
      {/* 호버 시 오버레이 효과 */}
      {href && (
        <div className="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition-opacity duration-300" />
      )}
    </div>
  );

  // 링크가 있으면 Link로 감싸기
  if (href) {
    return (
      <Link
        href={href}
        className="block transition-transform duration-200 hover:scale-[1.02] cursor-pointer"
      >
        {imageElement}
      </Link>
    );
  }

  // 링크가 없으면 그냥 이미지만
  return imageElement;
};

export default BannerImageModule;
