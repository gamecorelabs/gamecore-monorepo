import { createApi } from "./apiFactory";

const adminApi = createApi(
  {
    publicUrl: process.env.NEXT_PUBLIC_ADMIN_API_URL as string,
    internalUrl: process.env.INTERNAL_ADMIN_API_URL as string,
  },
  {
    withCredentials: true,
  }
);

export default adminApi;
