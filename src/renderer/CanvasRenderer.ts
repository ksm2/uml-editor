import {
  Classifier,
  Diagram,
  LinePattern,
  Relationship,
  Renderer,
  Separator,
  Text,
  Tip,
  Title,
} from "../model";

const PADDING = 10;

class CanvasRenderer implements Renderer {
  private readonly width: number[];
  private readonly height: number[];
  private readonly ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.width = [canvas.width];
    this.height = [canvas.height];
    this.ctx = canvas.getContext("2d")!;
  }

  renderDiagram(diagram: Diagram): void {
    this.ctx.save();
    this.ctx.translate(this.width[0] / 2, this.height[0] / 2);
    for (const child of diagram.getChildren()) {
      child.render(this);
    }
    this.ctx.restore();
  }

  renderClassifier(classifier: Classifier): void {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.translate(classifier.getLeft(), classifier.getTop());
    this.ctx.lineWidth = 1.5;
    this.ctx.strokeStyle = "#212529";
    this.ctx.fillStyle = "white";
    this.ctx.rect(0, 0, classifier.width, classifier.height);
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.clip();

    this.ctx.translate(PADDING, PADDING);
    this.width.unshift(classifier.width - 2 * PADDING);
    this.height.unshift(classifier.height - 2 * PADDING);
    for (const child of classifier.getChildren()) {
      child.render(this);
    }
    this.width.shift();
    this.height.shift();

    this.ctx.restore();
  }

  renderRelationship(relationship: Relationship): void {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.moveTo(relationship.getX1(), relationship.getY1());
    this.ctx.lineTo(relationship.getX2(), relationship.getY2());
    this.applyRelationshipStyle(relationship);
    this.ctx.stroke();
    this.drawFromTip(relationship);
    this.drawToTip(relationship);
    this.ctx.restore();
  }

  private applyRelationshipStyle(relationship: Relationship): void {
    this.ctx.lineWidth = 1.5;
    this.ctx.strokeStyle = "#212529";
    this.ctx.fillStyle = "white";
    switch (relationship.linePattern) {
      case LinePattern.SOLID:
        this.ctx.setLineDash([]);
        break;
      case LinePattern.DOTS:
        this.ctx.setLineDash([2, 2]);
        break;
      case LinePattern.SMALL_DASHES:
        this.ctx.setLineDash([5, 5]);
        break;
      case LinePattern.LARGE_DASHES:
        this.ctx.setLineDash([10, 10]);
        break;
      case LinePattern.TIGHT_DASHES:
        this.ctx.setLineDash([15, 5]);
        break;
    }
  }

  private drawFromTip(relationship: Relationship): void {
    if (relationship.fromTip !== Tip.NONE) {
      this.ctx.save();
      this.ctx.setLineDash([]);
      this.ctx.translate(relationship.getX1(), relationship.getY1());
      this.ctx.rotate(relationship.getAngle() + Math.PI);
      this.drawTip(relationship.fromTip);
      this.ctx.restore();
    }
  }

  private drawToTip(relationship: Relationship): void {
    if (relationship.toTip !== Tip.NONE) {
      this.ctx.save();
      this.ctx.setLineDash([]);
      this.ctx.translate(relationship.getX2(), relationship.getY2());
      this.ctx.rotate(relationship.getAngle());
      this.drawTip(relationship.toTip);
      this.ctx.restore();
    }
  }

  renderText(text: Text) {
    this.drawText(text.text, "normal normal 1.25rem system-ui", "left");
    this.ctx.translate(0, 20);
  }

  renderTitle(title: Title): void {
    this.drawText(title.text, "normal bold 1.25rem system-ui", "center");
    this.ctx.translate(0, 20);
  }

  renderSeparator(separator: Separator): void {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.moveTo(-PADDING, PADDING);
    this.ctx.lineTo(this.width[0] + PADDING, PADDING);
    this.ctx.lineWidth = 1.5;
    this.ctx.strokeStyle = "#212529";
    this.ctx.stroke();
    this.ctx.restore();
    this.ctx.translate(0, 2 * PADDING);
  }

  private drawText(text: string, font: string, align: "left" | "center") {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.font = font;
    this.ctx.fillStyle = "#212529";
    const metrics = this.ctx.measureText(text);
    const x = align === "center" ? (this.width[0] - metrics.width) / 2 : 0;
    this.ctx.fillText(text, x, metrics.fontBoundingBoxAscent - 3);
    this.ctx.restore();
  }

  private drawTip(tip: Tip): void {
    switch (tip) {
      case Tip.ARROW:
        this.drawArrow();
        break;
      case Tip.TRIANGLE:
        this.drawTriangle();
        break;
      case Tip.FILLED_TRIANGLE:
        this.ctx.fillStyle = this.ctx.strokeStyle;
        this.drawTriangle();
        break;
      case Tip.DIAMOND:
        this.drawDiamond();
        break;
      case Tip.FILLED_DIAMOND:
        this.ctx.fillStyle = this.ctx.strokeStyle;
        this.drawDiamond();
        break;
      case Tip.CIRCLE:
        this.drawCircle();
        break;
      case Tip.FILLED_CIRCLE:
        this.ctx.fillStyle = this.ctx.strokeStyle;
        this.drawCircle();
        break;
    }
  }

  private drawArrow() {
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(-20, 8);
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(-20, -8);
    this.ctx.closePath();
    this.ctx.stroke();
  }

  private drawTriangle(): void {
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(-20, 10);
    this.ctx.lineTo(-20, -10);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
  }

  private drawDiamond(): void {
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(-15, 8);
    this.ctx.lineTo(-30, 0);
    this.ctx.lineTo(-15, -8);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
  }

  private drawCircle(): void {
    this.ctx.beginPath();
    this.ctx.ellipse(-10, 0, 10, 10, 0, 0, 260);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
  }
}

export default CanvasRenderer;
