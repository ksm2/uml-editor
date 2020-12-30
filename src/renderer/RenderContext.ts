import { PropertyMap, Style } from "../css";

class RenderContext {
  private readonly width: number[];
  private readonly height: number[];
  private readonly context: string[];
  private readonly style: Style;

  constructor(canvasWidth: number, canvasHeight: number, style: Style) {
    this.width = [canvasWidth];
    this.height = [canvasHeight];
    this.context = [];
    this.style = style;
  }

  push(name: string, width?: number, height?: number): void {
    this.context.unshift(name);
    this.width.unshift(width ?? this.getWidth());
    this.height.unshift(height ?? this.getHeight());
  }

  pop(): void {
    this.context.shift();
    this.width.shift();
    this.height.shift();
  }

  getName(): string {
    return this.context[0];
  }

  getWidth(): number {
    return this.width[0];
  }

  getHeight(): number {
    return this.height[0];
  }

  getStyleProperties(): PropertyMap {
    return this.style.getProperties([...this.context].reverse());
  }
}

export default RenderContext;
