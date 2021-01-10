import { decode, encode } from "../base64";

describe("base64", () => {
  describe("encode", () => {
    it("encodes zero bytes", () => {
      expect(encode(new Uint8Array([]))).toBe(btoa(""));
    });

    it("encodes one byte", () => {
      expect(encode(new Uint8Array([0x61]))).toBe(btoa("a"));
    });

    it("encodes two bytes", () => {
      expect(encode(new Uint8Array([0x61, 0x62]))).toBe(btoa("ab"));
    });

    it("encodes three bytes", () => {
      expect(encode(new Uint8Array([0x61, 0x62, 0x63]))).toBe(btoa("abc"));
    });

    it("encodes six bytes", () => {
      expect(encode(new Uint8Array([0x41, 0x42, 0x43, 0x61, 0x62, 0x63]))).toBe(btoa("ABCabc"));
    });
  });

  describe("decode", () => {
    it("decodes zero bytes", () => {
      expect(decode(btoa(""))).toStrictEqual(new Uint8Array([]));
    });

    it("decodes one byte", () => {
      expect(decode(btoa("a"))).toStrictEqual(new Uint8Array([0x61]));
    });

    it("decodes two bytes", () => {
      expect(decode(btoa("ab"))).toStrictEqual(new Uint8Array([0x61, 0x62]));
    });

    it("decodes three bytes", () => {
      expect(decode(btoa("abc"))).toStrictEqual(new Uint8Array([0x61, 0x62, 0x63]));
    });

    it("decodes six bytes", () => {
      expect(decode(btoa("ABCabc"))).toStrictEqual(
        new Uint8Array([0x41, 0x42, 0x43, 0x61, 0x62, 0x63]),
      );
    });
  });
});
