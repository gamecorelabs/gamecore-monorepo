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
        backgroundColor: 'var(--card-bg)',
        borderColor: 'var(--border-color)' 
      }}
    >
      <div className="mx-auto px-6 py-3">
        <ul className="flex space-x-1 min-w-max">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.id}>
                <Link 
                  href={item.href} 
                  className="relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 border inline-block"
                  style={{
                    backgroundColor: isActive 
                      ? 'rgba(var(--primary-color-rgb), 0.2)' 
                      : 'transparent',
                    color: isActive 
                      ? 'var(--primary-color)' 
                      : 'var(--text-secondary)',
                    borderColor: isActive 
                      ? 'rgba(var(--primary-color-rgb), 0.4)' 
                      : 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = 'var(--text-color)';
                      e.currentTarget.style.backgroundColor = 'rgba(var(--primary-color-rgb), 0.1)';
                      e.currentTarget.style.borderColor = 'rgba(var(--primary-color-rgb), 0.3)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = 'var(--text-secondary)';
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.borderColor = 'transparent';
                    }
                  }}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div 
                      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                      style={{ backgroundColor: 'var(--primary-color)' }}
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
