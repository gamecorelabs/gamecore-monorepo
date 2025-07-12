import { createApi } from "./apiFactory";

const dataApi = createApi({
  publicUrl: process.env.NEXT_PUBLIC_DATA_API_URL as string,
  internalUrl: process.env.INTERNAL_DATA_API_URL as string,
});

export default dataApi;
