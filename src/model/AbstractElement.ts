import Element from "./Element";
import Renderer from "./Renderer";

abstract class AbstractElement implements Element {
  private readonly children = new Set<Element>();
  private hovered = false;
  private selected = false;

  abstract render(renderer: Renderer): void;

  getChildren(): readonly Element[] {
    return [...this.children];
  }

  addChild(child: Element): this {
    this.children.add(child);
    return this;
  }

  deleteChild(child: Element): boolean {
    return this.children.delete(child);
  }

  isHovered(): boolean {
    return this.hovered;
  }

  setHovered(hovered: boolean): void {
    this.hovered = hovered;
  }

  isSelected(): boolean {
    return this.selected;
  }

  setSelected(selected: boolean): void {
    this.selected = selected;
  }
}

export default AbstractElement;
