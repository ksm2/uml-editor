import { Relationship, Tip } from "../model";

class Composition extends Relationship {
  toTip: Tip = Tip.FILLED_DIAMOND;
}

export default Composition;
