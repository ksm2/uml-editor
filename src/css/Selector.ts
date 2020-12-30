class Selector {
  readonly tag: string;
  readonly classes: Set<string>;
  readonly id?: string;

  constructor(tag: string, classes: Set<string>, id?: string) {
    this.tag = tag;
    this.classes = classes;
    this.id = id;
  }
}

export default Selector;
