import { LinePattern, Relationship, Tip } from "../model";

class Implementation extends Relationship {
  toTip: Tip = Tip.TRIANGLE;
  linePattern: LinePattern = LinePattern.TIGHT_DASHES;

  getTagName(): string {
    return "Implementation";
  }
}

export default Implementation;
