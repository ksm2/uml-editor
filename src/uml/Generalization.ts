import { Relationship, Tip } from "../model";

class Generalization extends Relationship {
  toTip: Tip = Tip.TRIANGLE;

  getTagName(): string {
    return "Generalization";
  }
}

export default Generalization;
