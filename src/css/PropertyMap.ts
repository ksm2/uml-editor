import Color from "./Color";
import Property from "./Property";

class PropertyMap implements Iterable<[string, unknown]> {
  protected readonly map: Map<string, unknown>;

  constructor(properties = new Set<Property>()) {
    this.map = new Map<string, unknown>(
      [...properties].map((property) => [property.key, property.value] as const),
    );
  }

  [Symbol.iterator](): Iterator<[string, unknown]> {
    return this.map.entries();
  }

  addAll(map: PropertyMap): this {
    for (const [key, value] of map) {
      this.map.set(key, value);
    }
    return this;
  }

  getString(key: string, fallback: string): string {
    const value = this.map.get(key);
    if (typeof value === "string") {
      return value;
    }

    return fallback;
  }

  getColor(key: string, fallback: Color): Color {
    const value = this.map.get(key);
    if (value instanceof Color) {
      return value;
    }

    return fallback;
  }

  getFloat(key: string, fallback: number): number {
    const value = this.map.get(key);
    if (typeof value === "number") {
      return value;
    }

    return fallback;
  }
}

export default PropertyMap;
