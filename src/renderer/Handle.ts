import { Anchor } from "../model";

class Handle {
  readonly x: number;
  readonly y: number;
  readonly anchor: Anchor;

  constructor(x: number, y: number, anchor: Anchor) {
    this.x = x;
    this.y = y;
    this.anchor = anchor;
  }
}

export default Handle;
