const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Simple clean background */}
      <div className="fixed inset-0 z-0 bg-slate-950"></div>

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col min-h-screen">{children}</div>
    </div>
  );
};

export default Container;
