import { createBaseApi } from "./baseApi";

const adminApi = createBaseApi(process.env.NEXT_PUBLIC_ADMIN_API_URL as string);

export default adminApi;
