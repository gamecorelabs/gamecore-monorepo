import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuItem } from "@/types/channel/channel.types";

const Nav = ({ menuItems }: { menuItems?: MenuItem[] }) => {
  const pathname = usePathname();

  if (menuItems === undefined || menuItems.length === 0) return;

  return (
    <nav
      className="relative backdrop-blur-sm border-t overflow-x-auto"
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--border-color)",
      }}
    >
      <div className="mx-auto px-6 py-1">
        <ul className="flex space-x-1 min-w-max">
          {menuItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <li key={item.id} className="relative">
                <Link
                  href={item.href}
                  className={`nav-link relative px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 inline-flex items-center gap-2 ${
                    isActive ? "nav-active" : ""
                  }`}
                  style={{
                    color: isActive
                      ? "var(--primary-color)"
                      : "var(--text-secondary)",
                  }}
                >
                  {isActive && (
                    <div
                      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                      style={{ backgroundColor: "var(--primary-color)" }}
                    ></div>
                  )}

                  <span className="relative z-10">{item.title}</span>

                  {item.badge && (
                    <span className="absolute -top-1 -right-1 text-xs px-1 py-0.5 rounded-full font-bold min-w-4 h-4 flex items-center justify-center bg-[#ff4444] text-white leading-none">
                      {item.badge}
                    </span>
                  )}
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
