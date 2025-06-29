export function encodeBase64Unicode(str: string): string {
  return btoa(decodeURIComponent(encodeURIComponent(str)));
}
