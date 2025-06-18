const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col h-full relative">
      <div className="flex-1 overflow-y-auto">{children}</div>
    </main>
  );
};

export default Main;
