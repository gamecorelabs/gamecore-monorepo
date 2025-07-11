import { createBaseApi } from "./baseApi";

const isServer = typeof window === "undefined";

const baseURL = isServer
  ? process.env.ADMIN_API_URL
  : process.env.NEXT_PUBLIC_ADMIN_API_URL;

const adminApi = createBaseApi(baseURL as string);

export default adminApi;
