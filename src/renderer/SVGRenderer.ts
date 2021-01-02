import { PADDING } from "../constants";
import { Color, Style } from "../css";
import {
  Classifier,
  ClassifierRenderer,
  Diagram,
  Relationship,
  RelationshipRenderer,
  Renderer,
  Separator,
  Stereotype,
  Text,
  Title,
} from "../model";
import CanvasClassifierRenderer from "./CanvasClassifierRenderer";
import CanvasRelationshipRenderer from "./CanvasRelationshipRenderer";
import RenderContext from "./RenderContext";
import SVGCanvas from "./SVGCanvas";

class SVGRenderer implements Renderer {
  private readonly context: RenderContext;
  private readonly canvas: SVGCanvas;
  private readonly classifierRenderer: ClassifierRenderer;
  private readonly relationshipRenderer: RelationshipRenderer;

  constructor(svg: SVGSVGElement, style: Style) {
    this.context = new RenderContext(svg.width.baseVal.value, svg.height.baseVal.value, style);
    this.canvas = new SVGCanvas(svg);
    this.classifierRenderer = new CanvasClassifierRenderer(this, this.context, this.canvas);
    this.relationshipRenderer = new CanvasRelationshipRenderer(this.canvas);
  }

  renderDiagram(diagram: Diagram): void {
    for (const child of diagram.getChildren()) {
      child.render(this);
    }
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
    this.drawText(text.text, "14pt", "start");
    this.canvas.translate(0, 20);
    this.context.pop();
  }

  renderTitle(title: Title): void {
    this.context.push("Title");
    this.drawText(title.text, "14pt", "middle");
    this.canvas.translate(0, 20);
    this.context.pop();
  }

  renderStereotype(stereotype: Stereotype): void {
    const contextName = this.context.getName();
    this.context.push("Stereotype");
    this.drawText(`«${contextName}»`, "12pt", "middle");
    this.canvas.translate(0, 20);
    this.context.pop();
  }

  renderSeparator(separator: Separator): void {
    this.canvas.beginPath();
    this.canvas.moveTo(-PADDING, PADDING);
    this.canvas.lineTo(this.context.getWidth() + PADDING, PADDING);
    this.canvas.lineWidth = 1.5;
    this.canvas.strokeColor = Color.DARK;
    this.canvas.stroke();
    this.canvas.translate(0, 2 * PADDING);
  }

  private drawText(text: string, size: string, align: "start" | "middle") {
    const properties = this.context.getStyleProperties();
    this.canvas.fontWeight = properties.getString("font-weight", "normal");
    this.canvas.fontStyle = properties.getString("font-style", "normal");
    this.canvas.fontSize = properties.getString("font-size", size);
    this.canvas.fontFamily = properties.getString(
      "font-family",
      "Arial, Helvetica, system-ui, sans-serif",
    );
    this.canvas.save();
    this.canvas.beginPath();
    this.canvas.fillColor = properties.getColor("color", Color.DARK);
    const x = align === "middle" ? this.context.getWidth() / 2 : 0;
    this.canvas.fillText(text, align, x, 4);
    this.canvas.restore();
  }
}

export default SVGRenderer;
