"use client";

import Link from "next/link";
import defaultMenuJson from "@/mocks/default-menu.mock.json";

// FIXME: 타입 분리
type NavItem = {
  id: number;
  title: string;
  href: string;
};

const defaultMenu: NavItem[] = defaultMenuJson as NavItem[];

// FIXME: 추후 캐시를 이용하여 nav items를 불러오기
const Nav = ({ items }: { items?: NavItem[] }) => {
  let pathname: string = "";
  const menuItems = items && items.length > 0 ? items : defaultMenu;
  if (typeof window !== "undefined" && window.location.pathname) {
    pathname = window.location.pathname;

    console.log("Current Pathname:", pathname);
  }
  return (
    <nav className="bg-gray-800 text-white overflow-x-auto">
      <div className="mx-auto px-4 py-2">
        <ul className="flex space-x-4 min-w-max">
          {menuItems.map((item) => (
            <li key={item.id}>
              <Link href={item.href} className="hover:text-blue-500">
                {item.title}
              </Link>
            </li>
          ))}
          {/* <li>
            <Link href="/board" className={`hover:text-blue-500`}>
              게시판
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-blue-500">
              가이드
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-blue-500">
              지도
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-blue-500">
              마법
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-blue-500">
              사냥터
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-blue-500">
              계산기
            </Link>
          </li> */}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
