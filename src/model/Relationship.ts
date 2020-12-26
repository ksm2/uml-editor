import { qcos, qsin } from "../renderer/anchors";
import Classifier from "./Classifier";
import AbstractElement from "./AbstractElement";
import Anchor from "./Anchor";
import Renderer from "./Renderer";
import Tip from "./Tip";

class Relationship extends AbstractElement {
  readonly from: Classifier;
  readonly fromAnchor: Anchor;
  readonly fromTip: Tip;
  readonly to: Classifier;
  readonly toAnchor: Anchor;
  readonly toTip: Tip;

  constructor(
    from: Classifier,
    fromAnchor: Anchor,
    fromTip: Tip,
    to: Classifier,
    toAnchor: Anchor,
    toTip: Tip
  ) {
    super();
    this.from = from;
    this.fromAnchor = fromAnchor;
    this.fromTip = fromTip;
    this.to = to;
    this.toAnchor = toAnchor;
    this.toTip = toTip;
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

  getAngle(): number {
    return Math.atan2(this.getY2() - this.getY1(), this.getX2() - this.getX1());
  }

  render(renderer: Renderer): void {
    renderer.renderRelationship(this);
  }
}

export default Relationship;
