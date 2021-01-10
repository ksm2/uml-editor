const ASCII_LOWER_A = 97;
const ASCII_CAPITAL_A = 65;
const ASCII_EQ = 61;
const ASCII_ZERO = 48;
const ASCII_SLASH = 47;
const ASCII_PLUS = 43;

const BASE64_EQ = 0;
const BASE64_LOWER_A = 26;
const BASE64_ZERO = 52;
const BASE64_PLUS = 62;
const BASE64_SLASH = 63;

function byteToASCII(byte: number): number {
  const isUpperCaseLetter = byte < BASE64_LOWER_A;
  if (isUpperCaseLetter) {
    return byte + ASCII_CAPITAL_A;
  }
  const isLowerCaseLetter = byte < BASE64_ZERO;
  if (isLowerCaseLetter) {
    return byte - BASE64_LOWER_A + ASCII_LOWER_A;
  }
  const isNumber = byte < BASE64_PLUS;
  if (isNumber) {
    return byte - BASE64_ZERO + ASCII_ZERO;
  }
  if (byte === BASE64_PLUS) {
    return ASCII_PLUS;
  } else {
    return ASCII_SLASH;
  }
}

function asciiToByte(ascii: number): number {
  const isLowerCaseLetter = ascii >= ASCII_LOWER_A;
  if (isLowerCaseLetter) {
    return ascii - ASCII_LOWER_A + BASE64_LOWER_A;
  }
  const isUpperCaseLetter = ascii >= ASCII_CAPITAL_A;
  if (isUpperCaseLetter) {
    return ascii - ASCII_CAPITAL_A;
  }
  if (ascii === ASCII_EQ) {
    return BASE64_EQ;
  }
  const isNumber = ascii >= ASCII_ZERO;
  if (isNumber) {
    return ascii - ASCII_ZERO + BASE64_ZERO;
  }
  if (ascii === ASCII_PLUS) {
    return BASE64_PLUS;
  } else {
    return BASE64_SLASH;
  }
}

function threeToFourBytes(input1: number, input2: number, input3: number): number[] {
  const output1 = input1 >>> 2;
  const output2 = ((input1 & 0b11) << 4) | (input2 >>> 4);
  const output3 = ((input2 & 0b1111) << 2) | (input3 >>> 6);
  const output4 = input3 & 0b111111;
  return [output1, output2, output3, output4];
}

function fourToThreeBytes(
  input1: number,
  input2: number,
  input3: number,
  input4: number,
): number[] {
  const output1 = (input1 << 2) | (input2 >>> 4);
  const output2 = ((input2 & 0b1111) << 4) | (input3 >>> 2);
  const output3 = ((input3 & 0b11) << 6) | input4;
  return [output1, output2, output3];
}

function encodeString(output: number[]): string {
  return String.fromCharCode(...output.map(byteToASCII));
}

export function encode(input: Uint8Array): string {
  const output = [];
  let i;
  for (i = 0; i < input.length - 2; i += 3) {
    output.push(...threeToFourBytes(input[i], input[i + 1], input[i + 2]));
  }

  if (i === input.length - 2) {
    output.push(...threeToFourBytes(input[i], input[i + 1], 0));
    return encodeString(output).slice(0, -1) + "=";
  }
  if (i === input.length - 1) {
    output.push(...threeToFourBytes(input[i], 0, 0));
    return encodeString(output).slice(0, -2) + "==";
  }

  return encodeString(output);
}

export function decode(encoded: string): Uint8Array {
  if (encoded.length % 4 !== 0) {
    throw new Error("Base64 has incorrect length.");
  }

  const endsWith2Eq = encoded.slice(-2) === "==";
  const endsWith1Eq = !endsWith2Eq && encoded.slice(-1) === "=";
  const input = new Array(encoded.length)
    .fill(0)
    .map((_, i) => encoded.charCodeAt(i))
    .map(asciiToByte);
  const output = [];
  for (let i = 0; i < input.length - 3; i += 4) {
    output.push(...fourToThreeBytes(input[i], input[i + 1], input[i + 2], input[i + 3]));
  }
  if (endsWith2Eq) {
    return new Uint8Array(output.slice(0, -2));
  } else if (endsWith1Eq) {
    return new Uint8Array(output.slice(0, -1));
  } else {
    return new Uint8Array(output);
  }
}
