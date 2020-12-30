import {
  Anchor,
  Classifier,
  Diagram,
  LinePattern,
  Relationship,
  Renderer,
  Separator,
  Shape,
  Stereotype,
  Text,
  Tip,
  Title,
} from "../model";
import Handle from "./Handle";

const PADDING = 10;
const HANDLE_RADIUS = 4.5;

class CanvasRenderer implements Renderer {
  private readonly width: number[];
  private readonly height: number[];
  private readonly context: string[];
  private readonly ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.width = [canvas.width];
    this.height = [canvas.height];
    this.context = ["Canvas"];
    this.ctx = canvas.getContext("2d")!;
  }

  renderDiagram(diagram: Diagram): void {
    this.ctx.clearRect(0, 0, this.width[0], this.height[0]);
    this.ctx.save();
    this.ctx.translate(this.width[0] / 2, this.height[0] / 2);
    for (const child of diagram.getChildren()) {
      child.render(this);
    }
    this.renderHandles(diagram);
    this.ctx.restore();
  }

  renderClassifier(classifier: Classifier): void {
    this.ctx.save();
    this.ctx.translate(classifier.getLeft(), classifier.getTop());
    this.ctx.lineWidth = 1.5;
    this.ctx.strokeStyle = "#212529";
    this.ctx.fillStyle = classifier.isHovered() ? "#9accbb" : "white";
    this.drawShape(classifier);
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.clip();

    this.ctx.translate(PADDING, PADDING);
    this.width.unshift(classifier.getWidth() - 2 * PADDING);
    this.height.unshift(classifier.getHeight() - 2 * PADDING);
    this.context.unshift(Object.getPrototypeOf(classifier).constructor.name);
    for (const child of classifier.getChildren()) {
      child.render(this);
    }
    this.width.shift();
    this.height.shift();
    this.context.shift();

    this.ctx.restore();
  }

  isPointInClassifier(classifier: Classifier, x: number, y: number): boolean {
    this.ctx.save();
    this.ctx.translate(classifier.getLeft(), classifier.getTop());
    this.drawShape(classifier);
    const result = this.ctx.isPointInPath(x, y);
    this.ctx.restore();

    return result;
  }

  private drawShape(classifier: Classifier): void {
    this.ctx.beginPath();
    const w = classifier.getWidth();
    const h = classifier.getHeight();
    switch (classifier.shape) {
      case Shape.RECTANGLE:
        this.ctx.rect(0, 0, w, h);
        return;
      case Shape.ELLIPSE:
        this.ctx.ellipse(w / 2, h / 2, w / 2, h / 2, 0, 0, 2 * Math.PI);
        return;
      case Shape.FOLDER:
        const FOLDER_WIDTH = 80;
        const FOLDER_HEIGHT = 20;
        this.ctx.rect(0, -FOLDER_HEIGHT, FOLDER_WIDTH, FOLDER_HEIGHT);
        this.ctx.rect(0, 0, w, h);
        return;
      case Shape.NOTE:
        const NOTE_SIZE = 30;
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(0, h);
        this.ctx.lineTo(w - NOTE_SIZE, h);
        this.ctx.lineTo(w, h - NOTE_SIZE);
        this.ctx.lineTo(w, 0);
        this.ctx.closePath();

        this.ctx.moveTo(w - NOTE_SIZE, h);
        this.ctx.lineTo(w, h - NOTE_SIZE);
        this.ctx.lineTo(w - NOTE_SIZE, h - NOTE_SIZE);
        this.ctx.closePath();
        return;
      case Shape.BOX:
        const BOX_DEPTH = 20;
        this.ctx.rect(0, 0, w, h);

        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(w, 0);
        this.ctx.lineTo(w + BOX_DEPTH, -BOX_DEPTH);
        this.ctx.lineTo(BOX_DEPTH, -BOX_DEPTH);
        this.ctx.closePath();

        this.ctx.moveTo(w, 0);
        this.ctx.lineTo(w, h);
        this.ctx.lineTo(w + BOX_DEPTH, h - BOX_DEPTH);
        this.ctx.lineTo(w + BOX_DEPTH, -BOX_DEPTH);
        this.ctx.closePath();

        return;
      case Shape.FILE:
        const FILE_SIZE = 30;
        this.ctx.moveTo(FILE_SIZE, 0);
        this.ctx.lineTo(0, FILE_SIZE);
        this.ctx.lineTo(0, h);
        this.ctx.lineTo(w, h);
        this.ctx.lineTo(w, 0);
        this.ctx.closePath();

        this.ctx.moveTo(FILE_SIZE, 0);
        this.ctx.lineTo(0, FILE_SIZE);
        this.ctx.lineTo(FILE_SIZE, FILE_SIZE);
        this.ctx.closePath();
        return;
      case Shape.COMPONENT:
        const COMPONENT_WIDTH = 40;
        const COMPONENT_HEIGHT = 20;
        const COMPONENT_Y = (h - COMPONENT_HEIGHT * 3) / 2;

        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(0, COMPONENT_Y);
        this.ctx.lineTo(COMPONENT_WIDTH / 2, COMPONENT_Y);
        this.ctx.lineTo(COMPONENT_WIDTH / 2, COMPONENT_Y + COMPONENT_HEIGHT);
        this.ctx.lineTo(0, COMPONENT_Y + COMPONENT_HEIGHT);
        this.ctx.lineTo(0, COMPONENT_Y + COMPONENT_HEIGHT * 2);
        this.ctx.lineTo(COMPONENT_WIDTH / 2, COMPONENT_Y + COMPONENT_HEIGHT * 2);
        this.ctx.lineTo(COMPONENT_WIDTH / 2, COMPONENT_Y + COMPONENT_HEIGHT * 3);
        this.ctx.lineTo(0, COMPONENT_Y + COMPONENT_HEIGHT * 3);
        this.ctx.lineTo(0, h);
        this.ctx.lineTo(w, h);
        this.ctx.lineTo(w, 0);
        this.ctx.closePath();

        this.ctx.rect(COMPONENT_WIDTH / -2, COMPONENT_Y, COMPONENT_WIDTH, COMPONENT_HEIGHT);
        this.ctx.rect(
          COMPONENT_WIDTH / -2,
          COMPONENT_Y + 2 * COMPONENT_HEIGHT,
          COMPONENT_WIDTH,
          COMPONENT_HEIGHT,
        );
        return;
    }
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

  renderStereotype(stereotype: Stereotype): void {
    this.drawText(`«${this.context[0]}»`, "normal normal 1rem system-ui", "center");
    this.ctx.translate(0, 20);
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
    this.ctx.ellipse(-10, 0, 10, 10, 0, 0, 2 * Math.PI);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
  }

  private renderHandles(diagram: Diagram): void {
    this.ctx.save();
    this.ctx.fillStyle = "white";
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 1;

    for (const { x, y } of this.getHandles(diagram)) {
      this.renderHandleAtPoint(x, y);
    }

    this.ctx.restore();
  }

  private *getHandles(diagram: Diagram): Generator<Handle> {
    for (const child of diagram.getChildren()) {
      if (child instanceof Classifier && child.isSelected()) {
        yield* this.getClassifierHandles(child);
      }
    }
  }

  private renderHandleAtPoint(x: number, y: number): void {
    this.ctx.beginPath();
    this.ctx.rect(x - HANDLE_RADIUS, y - HANDLE_RADIUS, HANDLE_RADIUS * 2, HANDLE_RADIUS * 2);
    this.ctx.fill();
    this.ctx.stroke();
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
