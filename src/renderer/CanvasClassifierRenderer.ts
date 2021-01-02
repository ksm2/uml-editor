import { Color } from "../css";
import { Classifier, ClassifierRenderer, Renderer, Shape } from "../model";
import { PADDING } from "../constants";
import Canvas from "./Canvas";
import RenderContext from "./RenderContext";

class CanvasClassifierRenderer implements ClassifierRenderer {
  private readonly renderer: Renderer;
  private readonly context: RenderContext;
  private readonly canvas: Canvas;

  constructor(renderer: Renderer, context: RenderContext, canvas: Canvas) {
    this.renderer = renderer;
    this.context = context;
    this.canvas = canvas;
  }

  renderClassifier(classifier: Classifier): void {
    this.context.push(
      classifier.getTagName(),
      classifier.getWidth() - 2 * PADDING,
      classifier.getHeight() - 2 * PADDING,
    );

    this.canvas.save();
    this.canvas.translate(classifier.getLeft(), classifier.getTop());
    this.applyStyle(classifier);
    this.drawShape(classifier);
    this.canvas.fill();
    this.canvas.stroke();
    this.canvas.clip();

    this.canvas.translate(PADDING, PADDING);
    for (const child of classifier.getChildren()) {
      child.render(this.renderer);
    }

    this.canvas.restore();

    this.context.pop();
  }

  isPointInClassifier(classifier: Classifier, x: number, y: number): boolean {
    this.canvas.save();
    this.canvas.translate(classifier.getLeft(), classifier.getTop());
    this.drawShape(classifier);
    const result = this.canvas.isPointInPath(x, y);
    this.canvas.restore();

    return result;
  }

  private applyStyle(classifier: Classifier): void {
    const properties = this.context.getStyleProperties();
    this.canvas.lineWidth = properties.getFloat("line-width", 1.5);
    this.canvas.strokeColor = properties.getColor("stroke", Color.DARK);
    let fill = properties.getColor("fill", Color.WHITE);
    if (classifier.isHovered()) {
      fill = fill.mix(Color.INFO, 0.25);
    }
    this.canvas.fillColor = fill;
  }

  private drawShape(classifier: Classifier): void {
    this.canvas.beginPath();
    switch (classifier.shape) {
      case Shape.RECTANGLE:
        this.drawRectangleShape(classifier);
        return;
      case Shape.ELLIPSE:
        this.drawEllipseShape(classifier);
        return;
      case Shape.FOLDER:
        this.drawFolderShape(classifier);
        return;
      case Shape.NOTE:
        this.drawNoteShape(classifier);
        return;
      case Shape.BOX:
        this.drawBoxShape(classifier);
        return;
      case Shape.FILE:
        this.drawFileShape(classifier);
        return;
      case Shape.COMPONENT:
        this.drawComponentShape(classifier);
        return;
    }
  }

  private drawBoxShape(classifier: Classifier) {
    const BOX_DEPTH = 20;
    const w = classifier.getWidth();
    const h = classifier.getHeight();
    this.canvas.rect(0, 0, w, h);

    this.canvas.moveTo(0, 0);
    this.canvas.lineTo(w, 0);
    this.canvas.lineTo(w + BOX_DEPTH, -BOX_DEPTH);
    this.canvas.lineTo(BOX_DEPTH, -BOX_DEPTH);
    this.canvas.closePath();

    this.canvas.moveTo(w, 0);
    this.canvas.lineTo(w, h);
    this.canvas.lineTo(w + BOX_DEPTH, h - BOX_DEPTH);
    this.canvas.lineTo(w + BOX_DEPTH, -BOX_DEPTH);
    this.canvas.closePath();
  }

  private drawRectangleShape(classifier: Classifier) {
    this.canvas.rect(0, 0, classifier.getWidth(), classifier.getHeight());
  }

  private drawEllipseShape(classifier: Classifier) {
    const w = classifier.getWidth();
    const h = classifier.getHeight();
    this.canvas.ellipse(0, 0, w, h);
  }

  private drawFolderShape(classifier: Classifier) {
    const FOLDER_WIDTH = 80;
    const FOLDER_HEIGHT = 20;
    this.canvas.rect(0, -FOLDER_HEIGHT, FOLDER_WIDTH, FOLDER_HEIGHT);
    this.canvas.rect(0, 0, classifier.getWidth(), classifier.getHeight());
  }

  private drawNoteShape(classifier: Classifier) {
    const NOTE_SIZE = 30;
    const w = classifier.getWidth();
    const h = classifier.getHeight();
    this.canvas.moveTo(0, 0);
    this.canvas.lineTo(0, h);
    this.canvas.lineTo(w - NOTE_SIZE, h);
    this.canvas.lineTo(w, h - NOTE_SIZE);
    this.canvas.lineTo(w, 0);
    this.canvas.closePath();

    this.canvas.moveTo(w - NOTE_SIZE, h);
    this.canvas.lineTo(w, h - NOTE_SIZE);
    this.canvas.lineTo(w - NOTE_SIZE, h - NOTE_SIZE);
    this.canvas.closePath();
  }

  private drawFileShape(classifier: Classifier) {
    const w = classifier.getWidth();
    const h = classifier.getHeight();
    const FILE_SIZE = 30;
    this.canvas.moveTo(FILE_SIZE, 0);
    this.canvas.lineTo(0, FILE_SIZE);
    this.canvas.lineTo(0, h);
    this.canvas.lineTo(w, h);
    this.canvas.lineTo(w, 0);
    this.canvas.closePath();

    this.canvas.moveTo(FILE_SIZE, 0);
    this.canvas.lineTo(0, FILE_SIZE);
    this.canvas.lineTo(FILE_SIZE, FILE_SIZE);
    this.canvas.closePath();
  }

  private drawComponentShape(classifier: Classifier) {
    const w = classifier.getWidth();
    const h = classifier.getHeight();
    const COMPONENT_WIDTH = 40;
    const COMPONENT_HEIGHT = 20;
    const COMPONENT_Y = (h - COMPONENT_HEIGHT * 3) / 2;

    this.canvas.moveTo(0, 0);
    this.canvas.lineTo(0, COMPONENT_Y);
    this.canvas.lineTo(COMPONENT_WIDTH / 2, COMPONENT_Y);
    this.canvas.lineTo(COMPONENT_WIDTH / 2, COMPONENT_Y + COMPONENT_HEIGHT);
    this.canvas.lineTo(0, COMPONENT_Y + COMPONENT_HEIGHT);
    this.canvas.lineTo(0, COMPONENT_Y + COMPONENT_HEIGHT * 2);
    this.canvas.lineTo(COMPONENT_WIDTH / 2, COMPONENT_Y + COMPONENT_HEIGHT * 2);
    this.canvas.lineTo(COMPONENT_WIDTH / 2, COMPONENT_Y + COMPONENT_HEIGHT * 3);
    this.canvas.lineTo(0, COMPONENT_Y + COMPONENT_HEIGHT * 3);
    this.canvas.lineTo(0, h);
    this.canvas.lineTo(w, h);
    this.canvas.lineTo(w, 0);
    this.canvas.closePath();

    this.canvas.rect(COMPONENT_WIDTH / -2, COMPONENT_Y, COMPONENT_WIDTH, COMPONENT_HEIGHT);
    this.canvas.rect(
      COMPONENT_WIDTH / -2,
      COMPONENT_Y + 2 * COMPONENT_HEIGHT,
      COMPONENT_WIDTH,
      COMPONENT_HEIGHT,
    );
  }
}

export default CanvasClassifierRenderer;
