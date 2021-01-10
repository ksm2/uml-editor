import { Color } from "../css";
import { LinePattern, Relationship, RelationshipRenderer, Renderer, Tip } from "../model";
import bresenhamAlgorithm from "./bresenhamAlgorithm";
import Canvas from "./Canvas";

class CanvasRelationshipRenderer implements RelationshipRenderer {
  private readonly renderer: Renderer;
  private readonly canvas: Canvas;

  constructor(renderer: Renderer, canvas: Canvas) {
    this.renderer = renderer;
    this.canvas = canvas;
  }

  renderRelationship(relationship: Relationship): void {
    const [x1, y1, x2, y2] = bresenhamAlgorithm(this.renderer, relationship);
    const angle = Math.atan2(y2 - y1, x2 - x1);

    this.canvas.save();
    this.canvas.beginPath();
    this.canvas.moveTo(x1, y1);
    this.canvas.lineTo(x2, y2);
    this.applyRelationshipStyle(relationship);
    this.canvas.stroke();
    this.drawFromTip(relationship, angle, x1, y1);
    this.drawToTip(relationship, angle, x2, y2);
    this.canvas.restore();
  }

  private applyRelationshipStyle(relationship: Relationship): void {
    this.canvas.lineWidth = 1.5;
    this.canvas.strokeColor = Color.DARK;
    this.canvas.fillColor = Color.WHITE;
    switch (relationship.linePattern) {
      case LinePattern.SOLID:
        this.canvas.setLineDash([]);
        break;
      case LinePattern.DOTS:
        this.canvas.setLineDash([2, 2]);
        break;
      case LinePattern.SMALL_DASHES:
        this.canvas.setLineDash([5, 5]);
        break;
      case LinePattern.LARGE_DASHES:
        this.canvas.setLineDash([10, 10]);
        break;
      case LinePattern.TIGHT_DASHES:
        this.canvas.setLineDash([15, 5]);
        break;
    }
  }

  private drawFromTip(relationship: Relationship, angle: number, x: number, y: number): void {
    this.drawTip(relationship.fromTip, x, y, angle + Math.PI);
  }

  private drawToTip(relationship: Relationship, angle: number, x: number, y: number): void {
    this.drawTip(relationship.toTip, x, y, angle);
  }

  private drawTip(tip: Tip, x: number, y: number, angle: number) {
    if (tip !== Tip.NONE) {
      this.canvas.setLineDash([]);
      this.canvas.save();
      this.canvas.translate(x, y);
      this.canvas.rotate(angle);
      this.drawTipPath(tip);
      this.canvas.restore();
    }
  }

  private drawTipPath(tip: Tip): void {
    switch (tip) {
      case Tip.ARROW:
        this.drawArrow();
        break;
      case Tip.TRIANGLE:
        this.drawTriangle();
        break;
      case Tip.FILLED_TRIANGLE:
        this.canvas.fillColor = this.canvas.strokeColor;
        this.drawTriangle();
        break;
      case Tip.DIAMOND:
        this.drawDiamond();
        break;
      case Tip.FILLED_DIAMOND:
        this.canvas.fillColor = this.canvas.strokeColor;
        this.drawDiamond();
        break;
      case Tip.CIRCLE:
        this.drawCircle();
        break;
      case Tip.FILLED_CIRCLE:
        this.canvas.fillColor = this.canvas.strokeColor;
        this.drawCircle();
        break;
    }
  }

  private drawArrow() {
    this.canvas.beginPath();
    this.canvas.moveTo(0, 0);
    this.canvas.lineTo(-20, 8);
    this.canvas.moveTo(0, 0);
    this.canvas.lineTo(-20, -8);
    this.canvas.closePath();
    this.canvas.stroke();
  }

  private drawTriangle(): void {
    this.canvas.beginPath();
    this.canvas.moveTo(0, 0);
    this.canvas.lineTo(-20, 10);
    this.canvas.lineTo(-20, -10);
    this.canvas.closePath();
    this.canvas.fill();
    this.canvas.stroke();
  }

  private drawDiamond(): void {
    this.canvas.beginPath();
    this.canvas.moveTo(0, 0);
    this.canvas.lineTo(-15, 8);
    this.canvas.lineTo(-30, 0);
    this.canvas.lineTo(-15, -8);
    this.canvas.closePath();
    this.canvas.fill();
    this.canvas.stroke();
  }

  private drawCircle(): void {
    this.canvas.beginPath();
    this.canvas.ellipse(-20, -10, 20, 20);
    this.canvas.closePath();
    this.canvas.fill();
    this.canvas.stroke();
  }
}

export default CanvasRelationshipRenderer;
