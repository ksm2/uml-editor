import { Color } from "../css";

interface Canvas {
  fillColor: Color;
  strokeColor: Color;
  lineWidth: number;
  fontStyle: string;
  fontWeight: string;
  fontSize: string;
  fontFamily: string;
  setLineDash(dash: number[]): void;
  save(): void;
  restore(): void;
  translate(x: number, y: number): void;
  rotate(angle: number): void;
  beginPath(): void;
  rect(x: number, y: number, width: number, height: number): void;
  ellipse(x: number, y: number, width: number, height: number): void;
  moveTo(x: number, y: number): void;
  lineTo(x: number, y: number): void;
  isPointInPath(x: number, y: number): boolean;
  closePath(): void;
  getTransform(): DOMMatrix;
  fill(): void;
  stroke(): void;
  clip(): void;
  fillText(text: string, anchor: "start" | "middle" | "end", x: number, y: number): void;
}

export default Canvas;
