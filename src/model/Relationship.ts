import { qcos, qsin } from "../renderer/anchors";
import Classifier from "./Classifier";
import AbstractElement from "./AbstractElement";
import Anchor from "./Anchor";
import Renderer from "./Renderer";

class Relationship extends AbstractElement {
  readonly from: Classifier;
  readonly fromAnchor: Anchor;
  readonly to: Classifier;
  readonly toAnchor: Anchor;

  constructor(
    from: Classifier,
    fromAnchor: Anchor,
    to: Classifier,
    toAnchor: Anchor
  ) {
    super();
    this.from = from;
    this.fromAnchor = fromAnchor;
    this.to = to;
    this.toAnchor = toAnchor;
  }

  getX1(): number {
    return this.from.getLeft() + qsin(this.fromAnchor) * this.from.width;
  }

  getY1(): number {
    return this.from.getTop() + qcos(this.fromAnchor) * this.from.height;
  }

  getX2(): number {
    return this.to.getLeft() + qsin(this.toAnchor) * this.to.width;
  }

  getY2(): number {
    return this.to.getTop() + qcos(this.toAnchor) * this.to.height;
  }

  render(renderer: Renderer): void {
    renderer.renderRelationship(this);
  }
}

export default Relationship;
