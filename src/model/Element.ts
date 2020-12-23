import Renderer from "./Renderer";

interface Element {
  render(renderer: Renderer): void;
  addChild(child: Element): this;
  deleteChild(child: Element): boolean;
  getChildren(): readonly Element[];
}

export default Element;
