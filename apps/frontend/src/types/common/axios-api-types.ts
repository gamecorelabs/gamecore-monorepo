export type ApiOptions = {
  withCredentials?: boolean;
  headers?: Record<string, string>;
  timeout?: number;
};

export type ApiConfig = {
  publicUrl: string;
  internalUrl: string;
};
