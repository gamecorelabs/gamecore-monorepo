"use client";
import { useUserStore } from "@/store/userStore";
import { userLogin } from "@/utils/auth/login";
import { useRouter, useSearchParams } from "next/navigation";
import { getCurrentUserCSR } from "@/utils/auth/getCurrentUserCSR";

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email) {
      window.alert("이메일을 입력해주세요.");
      return false;
    }

    if (!password) {
      window.alert("비밀번호를 입력해주세요.");
      return false;
    }

    const redirectUrl = searchParams.get("redirect_url") || "/";
    const basicToken = btoa(`${email}:${password}`);
    const result = await userLogin(basicToken);

    if (!result) {
      return false;
    }

    router.push(redirectUrl);
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen px-4">
        <div className="max-w-sm w-full bg-white rounded-lg shadow-lg">
          <form
            className="p-6 rounded shadow"
            autoComplete="off"
            onSubmit={handleLogin}
          >
            <h2 className="text-2xl font-bold mb-6 text-center">로그인</h2>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-bold mb-1">
                이메일
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring text-slate-600"
                required
                autoFocus
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-bold mb-1"
              >
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded font-semibold hover:bg-gray-800 transition"
            >
              로그인
            </button>
            <button
              type="submit"
              className="w-full mt-4 bg-cyan-600 text-white py-2 rounded font-semibold hover:bg-gray-800 transition flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
                aria-hidden="true"
              >
                <path d="M20.317 4.369A19.791 19.791 0 0 0 16.885 3.1a.074.074 0 0 0-.079.037c-.34.607-.719 1.399-.984 2.025a18.524 18.524 0 0 0-5.59 0 12.51 12.51 0 0 0-.997-2.025.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.684 4.369a.069.069 0 0 0-.032.027C.533 9.09-.32 13.579.099 18.021a.082.082 0 0 0 .031.056c2.104 1.548 4.144 2.489 6.137 3.115a.077.077 0 0 0 .084-.027c.472-.65.893-1.34 1.248-2.065a.076.076 0 0 0-.041-.104c-.669-.253-1.304-.558-1.917-.892a.077.077 0 0 1-.008-.128c.129-.098.258-.2.381-.304a.074.074 0 0 1 .077-.01c4.014 1.833 8.36 1.833 12.326 0a.075.075 0 0 1 .078.009c.123.104.252.206.382.304a.077.077 0 0 1-.006.128 12.298 12.298 0 0 1-1.918.892.076.076 0 0 0-.04.105c.36.724.78 1.414 1.247 2.064a.076.076 0 0 0 .084.028c1.993-.626 4.033-1.567 6.138-3.115a.077.077 0 0 0 .03-.055c.5-5.177-.838-9.637-3.548-13.625a.061.061 0 0 0-.03-.028ZM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.218 0 2.175 1.102 2.157 2.418 0 1.334-.955 2.419-2.157 2.419Zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.218 0 2.175 1.102 2.157 2.418 0 1.334-.939 2.419-2.157 2.419Z" />
              </svg>
              디스코드로 로그인
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
