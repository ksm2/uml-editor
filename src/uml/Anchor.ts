import { LinePattern, Relationship } from "../model";

class Anchor extends Relationship {
  linePattern: LinePattern = LinePattern.DOTS;
}

export default Anchor;
