"use client";
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative backdrop-blur-sm border-t"
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--border-color)",
      }}
    >
      <div className="relative z-10 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand section */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="relative p-2 rounded-lg border"
                  style={{
                    backgroundColor: "var(--input-bg)",
                    borderColor: "var(--border-color)",
                  }}
                >
                  <svg
                    className="h-6 w-6"
                    style={{ color: "var(--primary-color)" }}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L2 7v10c0 5.55 3.84 9.739 9 10.924C16.16 26.739 20 22.55 20 17V7l-8-5z" />
                  </svg>
                </div>
                <div>
                  <h3
                    className="text-xl font-bold"
                    style={{ color: "var(--text-color)" }}
                  >
                    GameCore
                  </h3>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    게임 포털 플랫폼
                  </p>
                </div>
              </div>
              <p
                className="text-sm leading-relaxed max-w-md"
                style={{ color: "var(--text-secondary)" }}
              >
                다양한 게임 커뮤니티와 최신 뉴스, 이벤트 정보를 한 곳에서
                만나보세요. 게이머들을 위한 종합 포털 서비스입니다.
              </p>
            </div>

            {/* Quick links */}
            <div>
              <h4
                className="font-semibold mb-4 flex items-center gap-2"
                style={{ color: "var(--text-secondary)" }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: "var(--primary-color)" }}
                ></span>
                빠른 링크
              </h4>
              <ul className="space-y-2">
                {["게임 뉴스", "커뮤니티", "이벤트", "가이드"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="footer-link text-sm transition-colors"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Community */}
            <div>
              <h4
                className="font-semibold mb-4 flex items-center gap-2"
                style={{ color: "var(--text-secondary)" }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: "var(--primary-color)" }}
                ></span>
                커뮤니티
              </h4>
              <ul className="space-y-2">
                {["공지사항", "자유게시판", "질문답변", "건의사항"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="footer-link text-sm transition-colors"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div
            className="border-t my-8"
            style={{ borderColor: "var(--border-color)" }}
          ></div>

          {/* Bottom section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-6 text-sm">
              <a
                href="#"
                className="footer-link transition-colors"
                style={{ color: "var(--text-muted)" }}
              >
                개인정보처리방침
              </a>
              <a
                href="#"
                className="footer-link transition-colors"
                style={{ color: "var(--text-muted)" }}
              >
                이용약관
              </a>
              <a
                href="#"
                className="footer-link transition-colors"
                style={{ color: "var(--text-muted)" }}
              >
                고객지원
              </a>
            </div>

            <div className="text-center md:text-right">
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                &copy; {currentYear} GameCore.co.kr All rights reserved.
              </p>
              <p
                className="text-xs mt-1"
                style={{ color: "var(--text-muted)" }}
              >
                Made with 💜 for Gamers
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
