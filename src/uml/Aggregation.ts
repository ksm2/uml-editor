import { Relationship, Tip } from "../model";

class Aggregation extends Relationship {
  toTip: Tip = Tip.DIAMOND;
}

export default Aggregation;
