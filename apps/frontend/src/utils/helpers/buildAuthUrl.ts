export const buildAuthUrl = (path: string, redirectUrl: string) => {
  let url = `${path}`;
  if (redirectUrl) {
    url +=
      (url.includes("?") ? "&" : "?") +
      `redirect_url=${encodeURIComponent(redirectUrl)}`;
  }
  return url;
};
