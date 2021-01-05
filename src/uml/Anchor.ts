import { LinePattern, Relationship } from "../model";

class Anchor extends Relationship {
  linePattern: LinePattern = LinePattern.DOTS;

  getTagName(): string {
    return "Anchor";
  }
}

export default Anchor;
