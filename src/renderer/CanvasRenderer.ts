import {
  Classifier,
  Diagram,
  Relationship,
  Renderer,
  Separator,
  Text,
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
    this.ctx.lineWidth = 1.5;
    this.ctx.strokeStyle = "#212529";
    this.ctx.stroke();
    this.ctx.restore();
  }

  renderText(text: Text) {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.font = "normal bold 1.25rem system-ui";
    this.ctx.fillStyle = "#212529";
    const metrics = this.ctx.measureText(text.text);
    this.ctx.fillText(text.text, (this.width[0] - metrics.width) / 2, 17);
    this.ctx.restore();
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
}

export default CanvasRenderer;
