class Color {
  readonly red: number;
  readonly green: number;
  readonly blue: number;

  static readonly CYAN = Color.fromHexString("#0dcaf0");
  static readonly WHITE = Color.fromHexString("#ffffff");
  static readonly DARK = Color.fromHexString("#212529");

  constructor(red: number, green: number, blue: number) {
    this.red = Color.sanitizeComponent(red);
    this.green = Color.sanitizeComponent(green);
    this.blue = Color.sanitizeComponent(blue);
  }

  static fromHexString(hexString: string): Color {
    const red = parseInt(hexString.slice(1, 3), 16);
    const green = parseInt(hexString.slice(3, 5), 16);
    const blue = parseInt(hexString.slice(5, 7), 16);
    return new Color(red, green, blue);
  }

  private static clamp(min: number, max: number, value: number): number {
    return value < min ? min : value > max ? max : value;
  }

  private static sanitizeComponent(value: number): number {
    const clamped = Color.clamp(0, 255, value);
    return Math.round(clamped);
  }

  private static intToHex(value: number): string {
    return value.toString(16).padStart(2, "0");
  }

  toHexString(): string {
    return `#${Color.intToHex(this.red)}${Color.intToHex(this.green)}${Color.intToHex(this.blue)}`;
  }

  mix(other: Color, percentage: number): Color {
    const otherFactor = Color.clamp(0, 1, percentage);
    const thisFactor = 1 - otherFactor;
    const red = thisFactor * this.red + otherFactor * other.red;
    const green = thisFactor * this.green + otherFactor * other.green;
    const blue = thisFactor * this.blue + otherFactor * other.blue;
    return new Color(red, green, blue);
  }
}

export default Color;
