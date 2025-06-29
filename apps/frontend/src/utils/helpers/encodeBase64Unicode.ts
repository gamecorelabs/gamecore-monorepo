export function encodeBase64Unicode(str: string): string {
  const utf8Bytes = new TextEncoder().encode(str);
  let binary = "";
  utf8Bytes.forEach((byte) => (binary += String.fromCharCode(byte)));
  return btoa(binary);
}
