import { Relationship, Tip } from "../model";

class DirectedAssociation extends Relationship {
  toTip: Tip = Tip.ARROW;

  getTagName(): string {
    return "DirectedAssociation";
  }
}

export default DirectedAssociation;
