import { Relationship, Tip } from "../model";

class Composition extends Relationship {
  toTip: Tip = Tip.FILLED_DIAMOND;

  getTagName(): string {
    return "Composition";
  }
}

export default Composition;
