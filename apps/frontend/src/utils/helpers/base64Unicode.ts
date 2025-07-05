export function encodeBase64Unicode(str: string): string {
  const utf8Bytes = new TextEncoder().encode(str);
  let binary = "";
  utf8Bytes.forEach((byte) => (binary += String.fromCharCode(byte)));
  return btoa(binary);
}

export function decodeBase64Unicode(base64: string): string {
  const binary = atob(base64);
  const bytes = new Uint8Array([...binary].map((char) => char.charCodeAt(0)));
  return new TextDecoder().decode(bytes);
}
