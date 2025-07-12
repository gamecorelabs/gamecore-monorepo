import { createApi } from "./apiFactory";

const authApi = createApi(
  {
    publicUrl: process.env.NEXT_PUBLIC_AUTH_API_URL as string,
    internalUrl: process.env.INTERNAL_AUTH_API_URL as string,
  },
  {
    withCredentials: true,
  }
);

export default authApi;
