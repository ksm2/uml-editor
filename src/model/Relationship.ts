import { qcos, qsin } from "../renderer/anchors";
import AbstractElement from "./AbstractElement";
import Anchor from "./Anchor";
import Classifier from "./Classifier";
import LinePattern from "./LinePattern";
import Renderer from "./Renderer";
import Tip from "./Tip";

class Relationship extends AbstractElement {
  from: Classifier;
  fromAnchor: Anchor;
  fromTip: Tip = Tip.NONE;
  to: Classifier;
  toAnchor: Anchor;
  toTip: Tip = Tip.NONE;
  linePattern: LinePattern = LinePattern.SOLID;

  constructor(from: Classifier, fromAnchor: Anchor, to: Classifier, toAnchor: Anchor) {
    super();
    this.from = from;
    this.fromAnchor = fromAnchor;
    this.to = to;
    this.toAnchor = toAnchor;
  }

  getX1(): number {
    return this.from.getLeft() + qsin(this.fromAnchor) * this.from.getWidth();
  }

  getY1(): number {
    return this.from.getTop() + qcos(this.fromAnchor) * this.from.getHeight();
  }

  getX2(): number {
    return this.to.getLeft() + qsin(this.toAnchor) * this.to.getWidth();
  }

  getY2(): number {
    return this.to.getTop() + qcos(this.toAnchor) * this.to.getHeight();
  }

  getAngle(): number {
    return Math.atan2(this.getY2() - this.getY1(), this.getX2() - this.getX1());
  }

  render(renderer: Renderer): void {
    renderer.renderRelationship(this);
  }

  getTagName(): string {
    return "Relationship";
  }

  clone(): Relationship {
    const { constructor } = Object.getPrototypeOf(this);
    return new constructor(this.from, this.fromAnchor, this.to, this.toAnchor);
  }
}

export default Relationship;
