"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const menuItems = items && items.length > 0 ? items : defaultMenu;

  return (
    <nav
      className="relative backdrop-blur-sm border-t overflow-x-auto"
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--border-color)",
      }}
    >
      <div className="mx-auto px-6">
        <ul className="flex space-x-1 min-w-max">
          {menuItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={`nav-link relative px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 inline-block ${
                    isActive ? "nav-active" : ""
                  }`}
                  style={{
                    color: isActive
                      ? "var(--primary-color)"
                      : "var(--text-secondary)",
                  }}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div
                      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                      style={{ backgroundColor: "var(--primary-color)" }}
                    ></div>
                  )}

                  <span className="relative z-10">{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
