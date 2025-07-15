export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 flex flex-col items-center justify-center p-8">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">
            Game<span className="text-blue-400">Core</span>
          </h1>
          <div className="flex items-center justify-center space-x-4">
            <div className="w-16 h-1 bg-blue-400 rounded"></div>
            <p className="text-2xl md:text-3xl text-gray-300 font-medium">
              서비스 공사중입니다
            </p>
            <div className="w-16 h-1 bg-blue-400 rounded"></div>
          </div>
        </div>

        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
          <div
            className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.11s" }}
          ></div>
          <div
            className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>

        <div className="max-w-2xl mx-auto space-y-4">
          <p className="text-gray-400 text-lg">
            더 나은 게임 경험을 위해 열심히 준비하고 있습니다
          </p>
          <p className="text-gray-500 text-sm">
            곧 새로운 서비스로 찾아뵙겠습니다
          </p>
        </div>

        <div className="mt-12">
          <div className="w-16 h-16 mx-auto bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
            <svg
              className="w-8 h-8 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.859 0-7 3.141-7 7v1h17z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
