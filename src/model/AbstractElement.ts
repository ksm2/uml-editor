import Element from "./Element";
import Renderer from "./Renderer";

abstract class AbstractElement implements Element {
  private readonly children = new Set<Element>();

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
}

export default AbstractElement;
