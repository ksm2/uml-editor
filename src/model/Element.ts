import Renderer from "./Renderer";

interface Element extends Iterable<Element> {
  render(renderer: Renderer): void;
  addChild(child: Element): this;
  deleteChild(child: Element): boolean;
  getChildren(): readonly Element[];
  isHovered(): boolean;
  setHovered(hovered: boolean): void;
  isSelected(): boolean;
  setSelected(selected: boolean): void;
  getTagName(): string;
  clone(): Element;
}

export default Element;
