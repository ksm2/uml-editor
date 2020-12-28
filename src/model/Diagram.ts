import AbstractElement from "./AbstractElement";
import Element from "./Element";
import Renderer from "./Renderer";

class Diagram extends AbstractElement {
  render(renderer: Renderer): void {
    renderer.renderDiagram(this);
  }

  forEach(callback: (element: Element) => void) {
    this.forEachElement(this, callback);
  }

  private forEachElement(
    root: Element,
    callback: (element: Element) => void
  ): void {
    for (const child of root.getChildren()) {
      callback(child);
      this.forEachElement(child, callback);
    }
  }

  find(predicate: (element: Element) => boolean) {
    return this.findElement(this, predicate);
  }

  private findElement(
    element: Element,
    predicate: (element: Element) => boolean
  ): Element | undefined {
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
