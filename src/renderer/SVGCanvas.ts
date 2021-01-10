import { Color } from "../css";
import Canvas from "./Canvas";

class SVGCanvas implements Canvas {
  fillColor = Color.WHITE;
  strokeColor = Color.DARK;
  lineWidth = 1;
  fontFamily = "system-ui";
  fontSize = "1rem";
  fontStyle = "normal";
  fontWeight = "normal";
  private readonly document: Document;
  private readonly stack: SVGElement[];
  private readonly paths: SVGElement[] = [];
  private readonly saved: SVGElement[] = [];
  private readonly matrix: DOMMatrix[] = [new DOMMatrix()];
  private path?: SVGPathElement;
  private dash: number[] = [];

  constructor(container: SVGElement) {
    this.document = container.ownerDocument;
    this.stack = [container];
  }

  setLineDash(dash: number[]): void {
    this.dash = dash;
  }

  save(): void {
    this.saved.push(this.getContainer());
    this.matrix.push(new DOMMatrix(this.currentMatrix().toString()));
  }

  private currentMatrix(): DOMMatrix {
    return this.matrix[this.matrix.length - 1];
  }

  restore(): void {
    const saved = this.saved.pop()!;
    this.stack.splice(this.stack.indexOf(saved) + 1);
    this.matrix.pop();
  }

  translate(x: number, y: number): void {
    const svg = this.createSVG("g");
    svg.setAttribute("transform", `translate(${x},${y})`);
    this.getContainer().append(svg);

    this.stack.push(svg);
    this.currentMatrix().translate(x, y);
  }

  rotate(angle: number): void {
    const svg = this.createSVG("g");
    svg.setAttribute("transform", `rotate(${this.radiansToDegrees(angle)})`);
    this.getContainer().append(svg);

    this.stack.push(svg);
    this.currentMatrix().rotate(angle);
  }

  beginPath(): void {
    this.paths.splice(0);
  }

  rect(x: number, y: number, width: number, height: number): void {
    const rect = this.createSVG("rect");
    rect.setAttribute("x", String(x));
    rect.setAttribute("y", String(y));
    rect.setAttribute("width", String(width));
    rect.setAttribute("height", String(height));
    this.paths.push(rect);
  }

  ellipse(x: number, y: number, width: number, height: number): void {
    const ellipse = this.createSVG("ellipse");
    const radiusX = width / 2;
    const radiusY = height / 2;
    ellipse.setAttribute("cx", String(x + radiusX));
    ellipse.setAttribute("cy", String(y + radiusY));
    ellipse.setAttribute("rx", String(radiusX));
    ellipse.setAttribute("ry", String(radiusY));
    this.paths.push(ellipse);
  }

  moveTo(x: number, y: number): void {
    this.path = this.createSVG("path");
    this.path.setAttribute("d", `M${x},${y}`);
    this.paths.push(this.path);
  }

  lineTo(x: number, y: number): void {
    const data = this.path!.getAttribute("d");
    this.path!.setAttribute("d", `${data} L${x},${y}`);
  }

  closePath(): void {
    const data = this.path!.getAttribute("d");
    this.path!.setAttribute("d", `${data} Z`);
  }

  getTransform(): DOMMatrix {
    return this.currentMatrix();
  }

  isPointInPath(x: number, y: number): boolean {
    return false;
  }

  fill(): void {
    this.appendPaths();
    for (const path of this.paths) {
      path.setAttribute("fill", this.fillColor.toHexString());
    }
  }

  stroke(): void {
    this.appendPaths();
    for (const path of this.paths) {
      path.setAttribute("stroke", this.strokeColor.toHexString());
      path.setAttribute("stroke-width", String(this.lineWidth));
      path.setAttribute("stroke-dasharray", this.dash.join(" "));
    }
  }

  clip(): void {}

  fillText(text: string, anchor: "start" | "middle" | "end", x: number, y: number): void {
    const textEl = this.createSVG("text");
    textEl.setAttribute("x", String(x));
    textEl.setAttribute("y", String(y + 10));
    textEl.setAttribute("text-anchor", anchor);
    textEl.setAttribute("font-family", this.fontFamily);
    textEl.setAttribute("font-size", this.fontSize);
    textEl.setAttribute("font-style", this.fontStyle);
    textEl.setAttribute("font-weight", this.fontWeight);
    textEl.appendChild(this.document.createTextNode(this.encodeUTF8(text)));
    this.paths.push(textEl);
    this.fill();
  }

  private encodeUTF8(text: string): string {
    const textEncoder = new TextEncoder();
    const encoded = textEncoder.encode(text);
    return String.fromCharCode(...encoded);
  }

  private appendPaths(): void {
    this.getContainer().append(...this.paths);
  }

  private getContainer(): SVGElement {
    return this.stack[this.stack.length - 1];
  }

  private createSVG<K extends keyof SVGElementTagNameMap>(element: K): SVGElementTagNameMap[K] {
    return this.document.createElementNS("http://www.w3.org/2000/svg", element);
  }

  private radiansToDegrees(angle: number): number {
    return (180 * angle) / Math.PI;
  }
}

export default SVGCanvas;
