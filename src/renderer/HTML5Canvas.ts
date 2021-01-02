import { Color } from "../css";
import Canvas from "./Canvas";

class HTML5Canvas implements Canvas {
  private readonly ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  get fillColor(): Color {
    return Color.fromHexString(String(this.ctx.fillStyle));
  }

  set fillColor(color: Color) {
    this.ctx.fillStyle = color.toHexString();
  }

  get strokeColor(): Color {
    return Color.fromHexString(String(this.ctx.strokeStyle));
  }

  set strokeColor(color: Color) {
    this.ctx.strokeStyle = color.toHexString();
  }

  get lineWidth(): number {
    return this.ctx.lineWidth;
  }

  set lineWidth(width: number) {
    this.ctx.lineWidth = width;
  }

  get fontStyle(): string {
    return this.getFontAttribute(0);
  }

  set fontStyle(fontStyle: string) {
    this.updateFontAttribute(0, fontStyle);
  }

  get fontWeight(): string {
    return this.getFontAttribute(1);
  }

  set fontWeight(fontWeight: string) {
    this.updateFontAttribute(1, fontWeight);
  }

  get fontSize(): string {
    return this.getFontAttribute(2);
  }

  set fontSize(fontSize: string) {
    this.updateFontAttribute(2, fontSize);
  }

  get fontFamily(): string {
    return this.getFontAttribute(3);
  }

  set fontFamily(fontFamily: string) {
    this.updateFontAttribute(3, fontFamily);
  }

  setLineDash(dash: number[]): void {
    this.ctx.setLineDash(dash);
  }

  save(): void {
    this.ctx.save();
  }

  restore(): void {
    this.ctx.restore();
  }

  translate(x: number, y: number): void {
    this.ctx.translate(x, y);
  }

  rotate(angle: number): void {
    this.ctx.rotate(angle);
  }

  beginPath(): void {
    this.ctx.beginPath();
  }

  rect(x: number, y: number, width: number, height: number): void {
    this.ctx.rect(x, y, width, height);
  }

  ellipse(x: number, y: number, width: number, height: number): void {
    const radiusX = width / 2;
    const radiusY = height / 2;
    this.ctx.ellipse(x + radiusX, y + radiusY, radiusX, radiusY, 0, 0, Math.PI * 2);
  }

  moveTo(x: number, y: number): void {
    this.ctx.moveTo(x, y);
  }

  lineTo(x: number, y: number): void {
    this.ctx.lineTo(x, y);
  }

  isPointInPath(x: number, y: number): boolean {
    return this.ctx.isPointInPath(x, y);
  }

  closePath(): void {
    this.ctx.closePath();
  }

  fill(): void {
    this.ctx.fill();
  }

  stroke(): void {
    this.ctx.stroke();
  }

  clip(): void {
    this.ctx.clip();
  }

  fillText(text: string, anchor: "start" | "middle" | "end", x: number, y: number): void {
    const metrics = this.ctx.measureText(text);
    const anchorY = y + metrics.fontBoundingBoxAscent;
    let anchorX = x;
    if (anchor === "middle") {
      anchorX = anchorX + metrics.width / 2;
    } else if (anchor === "end") {
      anchorX = anchorX + metrics.width;
    }
    this.ctx.fillText(text, anchorX, anchorY);
  }

  private getFontAttribute(index: number): string {
    return this.ctx.font.split(" ", 4)[index];
  }

  private updateFontAttribute(index: number, value: string): void {
    const attrs = this.ctx.font.split(" ", 4);
    attrs[index] = value;
    this.ctx.font = attrs.join(" ");
  }
}

export default HTML5Canvas;
