import { PADDING } from "../constants";
import { Color } from "../css";
import { Classifier, ClassifierRenderer, Renderer } from "../model";
import Canvas from "./Canvas";
import RenderContext from "./RenderContext";
import ShapeRenderer from "./ShapeRenderer";

class CanvasClassifierRenderer implements ClassifierRenderer {
  private readonly renderer: Renderer;
  private readonly context: RenderContext;
  private readonly canvas: Canvas;
  private readonly shapeRenderer: ShapeRenderer;

  constructor(renderer: Renderer, context: RenderContext, canvas: Canvas) {
    this.renderer = renderer;
    this.context = context;
    this.canvas = canvas;
    this.shapeRenderer = new ShapeRenderer(canvas);
  }

  renderClassifier(classifier: Classifier): void {
    this.context.push(
      classifier.getTagName(),
      classifier.getWidth() - 2 * PADDING,
      classifier.getHeight() - 2 * PADDING,
    );

    this.canvas.save();
    this.applyStyle(classifier);
    this.drawShape(classifier);
    this.canvas.fill();
    this.canvas.stroke();
    this.canvas.clip();

    this.canvas.translate(classifier.getLeft() + PADDING, classifier.getTop() + PADDING);
    for (const child of classifier.getChildren()) {
      child.render(this.renderer);
    }

    this.canvas.restore();

    this.context.pop();
  }

  isPointInClassifier(classifier: Classifier, x: number, y: number): boolean {
    this.canvas.save();
    this.drawShape(classifier);
    const transform = this.canvas.getTransform();
    const domPoint = transform.transformPoint({ x, y });
    const result = this.canvas.isPointInPath(domPoint.x, domPoint.y);
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
    this.shapeRenderer.renderShape(classifier.shape, classifier.getRectangle());
  }
}

export default CanvasClassifierRenderer;
