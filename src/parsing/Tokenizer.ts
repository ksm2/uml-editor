import Token from "./Token";

abstract class Tokenizer<T> {
  private subject = "";
  private index = 0;

  tokenize(subject: string): Token<T>[] {
    this.subject = subject;
    this.index = 0;
    const tokens = [];
    while (this.index < this.subject.length) {
      const oldIndex = this.index;
      const kind = this.next();
      const newIndex = this.index;
      if (newIndex <= oldIndex) {
        throw new Error("Did not consume any characters");
      }

      if (kind === null) {
        continue;
      }

      const value = this.subject.slice(oldIndex, newIndex);
      tokens.push({ kind, value });
    }

    return tokens;
  }

  protected abstract next(): T | null;

  protected matches(search: RegExp): boolean {
    const match = this.subject.slice(this.index).match(search);
    if (match === null) {
      return false;
    }

    this.index += match[0].length;
    return true;
  }

  protected startsWith(search: string): boolean {
    if (this.subject.startsWith(search, this.index)) {
      this.index += search.length;
      return true;
    }

    return false;
  }
}

export default Tokenizer;
