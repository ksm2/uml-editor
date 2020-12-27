import { Relationship, Tip } from "../model";

class Generalization extends Relationship {
  toTip: Tip = Tip.TRIANGLE;
}

export default Generalization;
