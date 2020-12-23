import { Classifier, Diagram, Relationship, Renderer } from "../model";

class CanvasRenderer implements Renderer {
  private readonly width: number;
  private readonly height: number;
  private readonly ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = canvas.getContext("2d")!;
  }

  renderDiagram(diagram: Diagram): void {
    this.ctx.save();
    this.ctx.translate(this.width / 2, this.height / 2);
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
}

export default CanvasRenderer;
