import { createBaseApi } from "./baseApi";

const isServer = typeof window === "undefined";

const baseURL = isServer
  ? process.env.DATA_API_URL
  : process.env.NEXT_PUBLIC_DATA_API_URL;

const dataApi = createBaseApi(baseURL as string);

export default dataApi;
