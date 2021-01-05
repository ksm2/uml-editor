import { qcos, qsin } from "../renderer/anchors";
import AbstractElement from "./AbstractElement";
import Anchor from "./Anchor";
import Rectangle from "./Rectangle";
import Renderer from "./Renderer";
import Shape from "./Shape";

class Classifier extends AbstractElement {
  private readonly anchor: Anchor;
  x: number;
  y: number;
  private width: number;
  private height: number;
  shape: Shape = Shape.RECTANGLE;

  constructor(anchor: Anchor, x: number, y: number, width: number, height: number) {
    super();
    this.anchor = anchor;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  getTagName(): string {
    return "Classifier";
  }

  getRectangle(): Rectangle {
    return {
      x: this.getLeft(),
      y: this.getTop(),
      width: this.width,
      height: this.height,
    };
  }

  getWidth(): number {
    return this.width;
  }

  setWidth(width: number): void {
    this.width = width;
  }

  getX(): number {
    return this.x;
  }

  getY(): number {
    return this.y;
  }

  getHeight(): number {
    return this.height;
  }

  setHeight(height: number): void {
    this.height = height;
  }

  getLeft(): number {
    return this.x - this.width * qsin(this.anchor);
  }

  setLeft(left: number): void {
    this.x = left + this.width * qsin(this.anchor);
  }

  getCenterX(): number {
    return this.getLeft() + this.width / 2;
  }

  getRight(): number {
    return this.getLeft() + this.width;
  }

  getTop(): number {
    return this.y - this.height * qcos(this.anchor);
  }

  setTop(top: number): void {
    this.y = top + this.height * qcos(this.anchor);
  }

  getCenterY(): number {
    return this.getTop() + this.height / 2;
  }

  getBottom(): number {
    return this.getTop() + this.height;
  }

  render(renderer: Renderer): void {
    renderer.renderClassifier(this);
  }

  clone(): Classifier {
    const { constructor } = Object.getPrototypeOf(this);
    return new constructor(this.anchor, this.x + 20, this.y + 20, this.width, this.height);
  }
}

export default Classifier;
