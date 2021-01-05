import { LinePattern, Relationship, Tip } from "../model";

class Dependency extends Relationship {
  toTip: Tip = Tip.ARROW;
  linePattern: LinePattern = LinePattern.TIGHT_DASHES;

  getTagName(): string {
    return "Dependency";
  }
}

export default Dependency;
