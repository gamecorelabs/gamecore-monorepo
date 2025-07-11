import { createBaseApi } from "./baseApi";

const isServer = typeof window === "undefined";

const baseURL = isServer
  ? process.env.AUTH_API_URL
  : process.env.NEXT_PUBLIC_AUTH_API_URL;

const authApi = createBaseApi(baseURL as string, {
  withCredentials: true,
});

export default authApi;
