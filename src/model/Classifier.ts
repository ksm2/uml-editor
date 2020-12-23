import { qcos, qsin } from "../renderer/anchors";
import AbstractElement from "./AbstractElement";
import Anchor from "./Anchor";
import Renderer from "./Renderer";

class Classifier extends AbstractElement {
  readonly anchor: Anchor;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;

  constructor(
    anchor: Anchor,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    super();
    this.anchor = anchor;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  getLeft(): number {
    return this.x - this.width * qsin(this.anchor);
  }

  getTop(): number {
    return this.y - this.height * qcos(this.anchor);
  }

  render(renderer: Renderer): void {
    renderer.renderClassifier(this);
  }
}

export default Classifier;
