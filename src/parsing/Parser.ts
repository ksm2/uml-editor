import Token from "./Token";
import Tokenizer from "./Tokenizer";

abstract class Parser<T, D> {
  private readonly tokenizer: Tokenizer<T>;
  private tokens: Token<T>[] = [];
  private index = 0;

  constructor(tokenizer: Tokenizer<T>) {
    this.tokenizer = tokenizer;
  }

  parseFromString(string: string): D {
    this.index = 0;
    this.tokens = this.tokenizer.tokenize(string);
    return this.parse();
  }

  protected abstract parse(): D;

  protected consume(kind: T): Token<T> {
    const token = this.tokens[this.index];
    if (token.kind === kind) {
      this.index += 1;
      return token;
    } else {
      throw new Error(`Expected ${kind}, but was ${token.kind}`);
    }
  }

  protected parseOneOf<U1, U2, U3>(
    parser1: () => U1,
    parser2: () => U2,
    parser3: () => U3,
  ): U1 | U2 | U3;
  protected parseOneOf<U1, U2>(parser1: () => U1, parser2: () => U2): U1 | U2;
  protected parseOneOf<U1>(parser1: () => U1): U1;
  protected parseOneOf(...parsers: Array<() => unknown>): unknown {
    for (const parser of parsers) {
      const value = this.parseOptional(parser);
      if (value !== undefined) {
        return value;
      }
    }

    throw new Error("None of the one ofs matched");
  }

  protected parseSet<U>(parser: () => U): Set<U> {
    const result = new Set<U>();
    while (true) {
      const oldIndex = this.index;
      try {
        result.add(parser.call(this));
      } catch (err) {
        this.index = oldIndex;
        return result;
      }
      const newIndex = this.index;
      if (newIndex <= oldIndex) {
        throw new Error("Did not consume any tokens");
      }
    }
  }

  protected parseOptional<U>(parser: () => U): U | undefined {
    const oldIndex = this.index;
    let result;
    try {
      result = parser.call(this);
    } catch (err) {
      this.index = oldIndex;
      return undefined;
    }

    const newIndex = this.index;
    if (newIndex <= oldIndex) {
      throw new Error("Did not consume any tokens");
    }

    return result;
  }
}

export default Parser;
