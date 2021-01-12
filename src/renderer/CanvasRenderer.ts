import { GRID, HANDLE_RADIUS, PADDING } from "../constants";
import { Color, Style } from "../css";
import {
  Anchor,
  Classifier,
  Diagram,
  Relationship,
  Renderer,
  Separator,
  Stereotype,
  Text,
  Title,
} from "../model";
import CanvasClassifierRenderer from "./CanvasClassifierRenderer";
import CanvasOptions from "./CanvasOptions";
import CanvasRelationshipRenderer from "./CanvasRelationshipRenderer";
import Handle from "./Handle";
import HTML5Canvas from "./HTML5Canvas";
import RenderContext from "./RenderContext";

class CanvasRenderer implements Renderer {
  private readonly context: RenderContext;
  private readonly canvas: CanvasRenderingContext2D;
  private readonly classifierRenderer: CanvasClassifierRenderer;
  private readonly relationshipRenderer: CanvasRelationshipRenderer;
  private readonly grid: boolean;
  private readonly translateX: number;
  private readonly translateY: number;

  constructor(canvas: HTMLCanvasElement, style: Style, options: CanvasOptions) {
    this.context = new RenderContext(canvas.width, canvas.height, style);
    this.grid = options.grid;
    this.translateX = options.translateX;
    this.translateY = options.translateY;
    this.canvas = canvas.getContext("2d")!;
    const html5Canvas = new HTML5Canvas(this.canvas);
    this.classifierRenderer = new CanvasClassifierRenderer(this, this.context, html5Canvas);
    this.relationshipRenderer = new CanvasRelationshipRenderer(this, html5Canvas);
  }

  transformPoint(x: number, y: number): { x: number; y: number } {
    return {
      x: x - this.translateX,
      y: y - this.translateY,
    };
  }

  clear(): void {
    this.canvas.clearRect(0, 0, this.context.getWidth(), this.context.getHeight());
    if (this.grid) {
      this.renderGrid();
    }
  }

  private renderGrid(): void {
    const minX = -Math.floor(this.translateX / GRID) * GRID;
    const maxX = Math.floor(this.context.getWidth() - this.translateX / GRID) * GRID;
    const minY = -Math.floor(this.translateY / GRID) * GRID;
    const maxY = Math.floor(this.context.getHeight() - this.translateY / GRID) * GRID;

    this.canvas.save();
    this.canvas.translate(this.translateX, this.translateY);
    this.canvas.beginPath();
    this.canvas.strokeStyle = "#00000033";
    for (let x = minX; x < maxX; x += GRID) {
      this.canvas.moveTo(x, -this.translateY);
      this.canvas.lineTo(x, this.context.getHeight() - this.translateY);
    }
    for (let y = minY; y < maxY; y += GRID) {
      this.canvas.moveTo(-this.translateX, y);
      this.canvas.lineTo(this.context.getWidth() - this.translateX, y);
    }
    this.canvas.stroke();
    this.canvas.restore();
  }

  renderDiagram(diagram: Diagram): void {
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
    this.relationshipRenderer.renderRelationship(relationship);
  }

  renderText(text: Text) {
    this.context.push("Text");
    this.drawText(text.text, "14pt", "left");
    this.canvas.translate(0, 20);
    this.context.pop();
  }

  renderTitle(title: Title): void {
    this.context.push("Title");
    this.drawText(title.text, "14pt", "center");
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
    this.drawText(`«${contextName}»`, "12pt", "center");
    this.canvas.translate(0, 20);
    this.context.pop();
  }

  private drawText(text: string, size: string, align: "left" | "center") {
    const properties = this.context.getStyleProperties();
    const weight = properties.getString("font-weight", "normal");
    const style = properties.getString("font-style", "normal");
    const family = properties.getString("font-family", "Arial, Helvetica, system-ui, sans-serif");

    this.canvas.save();
    this.canvas.beginPath();
    this.canvas.font = `${style} ${weight} ${size} ${family}`;
    this.canvas.fillStyle = properties.getColor("color", Color.DARK).toHexString();
    const metrics = this.canvas.measureText(text);
    const x = align === "center" ? (this.context.getWidth() - metrics.width) / 2 : 0;
    this.canvas.fillText(text, x, metrics.fontBoundingBoxAscent);
    this.canvas.restore();
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
