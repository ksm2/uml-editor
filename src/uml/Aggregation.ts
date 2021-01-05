import { Relationship, Tip } from "../model";

class Aggregation extends Relationship {
  toTip: Tip = Tip.DIAMOND;

  getTagName(): string {
    return "Aggregation";
  }
}

export default Aggregation;
