import { createBaseApi } from "./baseApi";

const dataApi = createBaseApi(process.env.NEXT_PUBLIC_DATA_API_URL as string);

export default dataApi;
