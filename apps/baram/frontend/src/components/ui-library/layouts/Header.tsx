import Image from "next/image";
import Link from "next/link";
import Nav from "./Nav";

const Header = () => {
  return (
    <header className="bg-black shadow">
      {/* TopSide */}
      <div className="flex justify-between h-16 items-center">
        <div className="flex items-center">
          <Link href="/" className="flex gap-2 items-center justify-center">
            <Image
              src="/icons/tokki.gif"
              alt="바람의나라 게임코어 임시 아이콘"
              className="h-8"
              width={24}
              height={32}
            />
            <h1 className="text-xl font-bold">Baram</h1>
          </Link>
        </div>
        <div className="relative hidden sm:block">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
              />
            </svg>
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            href="/login"
            className="text-white hover:text-blue-500 transition-colors"
          >
            로그인
          </Link>
          <Link
            href="/register"
            className="text-white hover:text-blue-500 transition-colors"
          >
            회원가입
          </Link>
        </div>
      </div>
      {/* Search Bar for Mobile */}
      <div className="flex items-center justify-center">
        <div className="relative w-full block sm:hidden">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
              />
            </svg>
          </span>
        </div>
      </div>
      {/* Navigation Links */}
      <Nav />
    </header>
  );
};

export default Header;
