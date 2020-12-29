import { Consumer, Predicate } from "../utils";
import AbstractElement from "./AbstractElement";
import Element from "./Element";
import Renderer from "./Renderer";

class Diagram extends AbstractElement {
  render(renderer: Renderer): void {
    renderer.renderDiagram(this);
  }

  forEach(consumer: Consumer<Element>): void {
    this.forEachElement(this, consumer);
  }

  private forEachElement(root: Element, consumer: Consumer<Element>): void {
    for (const child of root.getChildren()) {
      consumer(child);
      this.forEachElement(child, consumer);
    }
  }

  find(predicate: Predicate<Element>): Element | undefined {
    return this.findElement(this, predicate);
  }

  private findElement(element: Element, predicate: Predicate<Element>): Element | undefined {
    const result = predicate(element);
    if (result) {
      return element;
    }

    for (const child of element.getChildren()) {
      const result = this.findElement(child, predicate);
      if (result !== undefined) {
        return result;
      }
    }

    return undefined;
  }
}

export default Diagram;
