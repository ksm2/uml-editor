import { Color, Style } from "../css";
import {
  Anchor,
  Classifier,
  Diagram,
  LinePattern,
  Relationship,
  Renderer,
  Separator,
  Stereotype,
  Text,
  Tip,
  Title,
} from "../model";
import CanvasClassifierRenderer from "./CanvasClassifierRenderer";
import CanvasOptions from "./CanvasOptions";
import { HANDLE_RADIUS, PADDING } from "../constants";
import Handle from "./Handle";
import RenderContext from "./RenderContext";

class CanvasRenderer implements Renderer {
  private readonly context: RenderContext;
  private readonly canvas: CanvasRenderingContext2D;
  private readonly classifierRenderer: CanvasClassifierRenderer;
  private readonly translateX: number;
  private readonly translateY: number;

  constructor(canvas: HTMLCanvasElement, style: Style, options: CanvasOptions) {
    this.context = new RenderContext(canvas.width, canvas.height, style);
    this.translateX = options.translateX;
    this.translateY = options.translateY;
    this.canvas = canvas.getContext("2d")!;
    this.classifierRenderer = new CanvasClassifierRenderer(this, this.context, this.canvas);
  }

  renderDiagram(diagram: Diagram): void {
    this.canvas.clearRect(0, 0, this.context.getWidth(), this.context.getHeight());
    this.canvas.save();
    this.canvas.translate(this.translateX, this.translateY);
    for (const child of diagram.getChildren()) {
      child.render(this);
    }
    this.renderHandles(diagram);
    this.canvas.restore();
  }

  renderClassifier(classifier: Classifier): void {
    this.classifierRenderer.renderClassifier(classifier);
  }

  isPointInClassifier(classifier: Classifier, x: number, y: number): boolean {
    return this.classifierRenderer.isPointInClassifier(classifier, x, y);
  }

  renderRelationship(relationship: Relationship): void {
    this.canvas.save();
    this.canvas.beginPath();
    this.canvas.moveTo(relationship.getX1(), relationship.getY1());
    this.canvas.lineTo(relationship.getX2(), relationship.getY2());
    this.applyRelationshipStyle(relationship);
    this.canvas.stroke();
    this.drawFromTip(relationship);
    this.drawToTip(relationship);
    this.canvas.restore();
  }

  private applyRelationshipStyle(relationship: Relationship): void {
    this.canvas.lineWidth = 1.5;
    this.canvas.strokeStyle = "#212529";
    this.canvas.fillStyle = "white";
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

  private drawFromTip(relationship: Relationship): void {
    if (relationship.fromTip !== Tip.NONE) {
      this.canvas.save();
      this.canvas.setLineDash([]);
      this.canvas.translate(relationship.getX1(), relationship.getY1());
      this.canvas.rotate(relationship.getAngle() + Math.PI);
      this.drawTip(relationship.fromTip);
      this.canvas.restore();
    }
  }

  private drawToTip(relationship: Relationship): void {
    if (relationship.toTip !== Tip.NONE) {
      this.canvas.save();
      this.canvas.setLineDash([]);
      this.canvas.translate(relationship.getX2(), relationship.getY2());
      this.canvas.rotate(relationship.getAngle());
      this.drawTip(relationship.toTip);
      this.canvas.restore();
    }
  }

  renderText(text: Text) {
    this.context.push("Text");
    this.drawText(text.text, "1.25rem", "left");
    this.canvas.translate(0, 20);
    this.context.pop();
  }

  renderTitle(title: Title): void {
    this.context.push("Title");
    this.drawText(title.text, "1.25rem", "center");
    this.canvas.translate(0, 20);
    this.context.pop();
  }

  renderSeparator(separator: Separator): void {
    this.canvas.save();
    this.canvas.beginPath();
    this.canvas.moveTo(-PADDING, PADDING);
    this.canvas.lineTo(this.context.getWidth() + PADDING, PADDING);
    this.canvas.lineWidth = 1.5;
    this.canvas.strokeStyle = "#212529";
    this.canvas.stroke();
    this.canvas.restore();
    this.canvas.translate(0, 2 * PADDING);
  }

  renderStereotype(stereotype: Stereotype): void {
    const contextName = this.context.getName();
    this.context.push("Stereotype");
    this.drawText(`«${contextName}»`, "1rem", "center");
    this.canvas.translate(0, 20);
    this.context.pop();
  }

  private drawText(text: string, size: string, align: "left" | "center") {
    const properties = this.context.getStyleProperties();
    const weight = properties.getString("font-weight", "normal");
    const style = properties.getString("font-style", "normal");

    this.canvas.save();
    this.canvas.beginPath();
    this.canvas.font = `${style} ${weight} ${size} system-ui`;
    this.canvas.fillStyle = properties.getColor("color", Color.DARK).toHexString();
    const metrics = this.canvas.measureText(text);
    const x = align === "center" ? (this.context.getWidth() - metrics.width) / 2 : 0;
    this.canvas.fillText(text, x, metrics.fontBoundingBoxAscent - 3);
    this.canvas.restore();
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
        this.canvas.fillStyle = this.canvas.strokeStyle;
        this.drawTriangle();
        break;
      case Tip.DIAMOND:
        this.drawDiamond();
        break;
      case Tip.FILLED_DIAMOND:
        this.canvas.fillStyle = this.canvas.strokeStyle;
        this.drawDiamond();
        break;
      case Tip.CIRCLE:
        this.drawCircle();
        break;
      case Tip.FILLED_CIRCLE:
        this.canvas.fillStyle = this.canvas.strokeStyle;
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
    this.canvas.ellipse(-10, 0, 10, 10, 0, 0, 2 * Math.PI);
    this.canvas.closePath();
    this.canvas.fill();
    this.canvas.stroke();
  }

  private renderHandles(diagram: Diagram): void {
    this.canvas.save();
    this.canvas.fillStyle = "white";
    this.canvas.strokeStyle = "black";
    this.canvas.lineWidth = 1;

    for (const { x, y } of this.getHandles(diagram)) {
      this.renderHandleAtPoint(x, y);
    }

    this.canvas.restore();
  }

  private *getHandles(diagram: Diagram): Generator<Handle> {
    for (const child of diagram.getChildren()) {
      if (child instanceof Classifier && child.isSelected()) {
        yield* this.getClassifierHandles(child);
      }
    }
  }

  private renderHandleAtPoint(x: number, y: number): void {
    this.canvas.beginPath();
    this.canvas.rect(x - HANDLE_RADIUS, y - HANDLE_RADIUS, HANDLE_RADIUS * 2, HANDLE_RADIUS * 2);
    this.canvas.fill();
    this.canvas.stroke();
  }

  findHandleForPoint(diagram: Diagram, x: number, y: number): Handle | undefined {
    for (const handle of this.getHandles(diagram)) {
      if (this.isPointInHandle(handle, x, y)) {
        return handle;
      }
    }
    return undefined;
  }

  private isPointInHandle(handle: Handle, x: number, y: number): boolean {
    return Math.abs(x - handle.x) <= HANDLE_RADIUS && Math.abs(y - handle.y) <= HANDLE_RADIUS;
  }

  private *getClassifierHandles(classifier: Classifier): Generator<Handle> {
    const x1 = classifier.getLeft();
    const x2 = classifier.getRight();
    const y1 = classifier.getTop();
    const y2 = classifier.getBottom();

    yield new Handle(x1, y1, Anchor.NW);
    yield new Handle(classifier.getCenterX(), y1, Anchor.N);
    yield new Handle(x2, y1, Anchor.NE);
    yield new Handle(x1, classifier.getCenterY(), Anchor.W);
    yield new Handle(x2, classifier.getCenterY(), Anchor.E);
    yield new Handle(x1, y2, Anchor.SW);
    yield new Handle(classifier.getCenterX(), y2, Anchor.S);
    yield new Handle(x2, y2, Anchor.SE);
  }
}

export default CanvasRenderer;
