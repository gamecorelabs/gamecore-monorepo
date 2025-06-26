import { createBaseApi } from "./baseApi";

const authApi = createBaseApi(process.env.NEXT_PUBLIC_AUTH_API_URL as string, {
  withCredentials: true,
});

export default authApi;
