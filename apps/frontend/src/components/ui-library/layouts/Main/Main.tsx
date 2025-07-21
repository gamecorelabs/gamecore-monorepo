const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <main
      className="flex flex-col flex-1 relative"
      style={{ backgroundColor: "var(--background-color)" }}
    >
      <div className="relative z-10 flex-1 px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            <div
              className="relative backdrop-blur-sm border rounded-lg overflow-hidden min-h-[600px]"
              style={{
                backgroundColor: "var(--card-bg)",
                borderColor: "var(--border-color)",
              }}
            >
              {/* Content */}
              <div className="relative z-10 p-6">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
