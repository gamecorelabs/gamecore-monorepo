const ACCESS_TOKEN_EXPIRE = 60 * 15; // 15분
const REFRESH_TOKEN_EXPIRE = 60 * 60 * 24 * 1; // 1일

export const TOKEN_EXPIRE = {
  access: ACCESS_TOKEN_EXPIRE,
  refresh: REFRESH_TOKEN_EXPIRE,
};
