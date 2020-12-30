class Property {
  readonly key: string;
  readonly value: unknown;

  constructor(key: string, value: unknown) {
    this.key = key;
    this.value = value;
  }
}

export default Property;
