import Element from './Element';
import AbstractElement from "./AbstractElement";
import Anchor from "./Anchor";
import Renderer from "./Renderer";

class Relationship extends AbstractElement {
  readonly from: Element;
  readonly fromAnchor: Anchor;
  readonly to: Element;
  readonly toAnchor: Anchor;

  constructor(
    from: Element,
    fromAnchor: Anchor,
    to: Element,
    toAnchor: Anchor
  ) {
    super();
    this.from = from;
    this.fromAnchor = fromAnchor;
    this.to = to;
    this.toAnchor = toAnchor;
  }

  render(renderer: Renderer): void {
    renderer.renderRelationship(this);
  }
}

export default Relationship;
