const enc = new TextEncoder();
const dec = new TextDecoder();

export function encode(str: string): Uint8Array {
  return enc.encode(str);
}

export function decode(utf8: Uint8Array): string {
  return dec.decode(utf8);
}
