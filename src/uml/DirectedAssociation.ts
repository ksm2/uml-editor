import { Relationship, Tip } from "../model";

class DirectedAssociation extends Relationship {
  toTip: Tip = Tip.ARROW;
}

export default DirectedAssociation;
