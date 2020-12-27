import { LinePattern, Relationship, Tip } from "../model";

class Dependency extends Relationship {
  toTip: Tip = Tip.ARROW;
  linePattern: LinePattern = LinePattern.TIGHT_DASHES;
}

export default Dependency;
