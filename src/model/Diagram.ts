import { Predicate } from "../utils";
import AbstractElement from "./AbstractElement";
import Classifier from "./Classifier";
import Element from "./Element";
import Renderer from "./Renderer";

class Diagram extends AbstractElement {
  render(renderer: Renderer): void {
    renderer.renderDiagram(this);
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

  getWidth(): number {
    return this.getRight() - this.getLeft();
  }

  getHeight(): number {
    return this.getBottom() - this.getTop();
  }

  getTop(): number {
    return this.reduceClassifiers((acc, classifier) => {
      const top = classifier.getTop();
      return acc > top ? top : acc;
    }, Infinity);
  }

  getBottom(): number {
    return this.reduceClassifiers((acc, classifier) => {
      const bottom = classifier.getBottom();
      return acc < bottom ? bottom : acc;
    }, -Infinity);
  }

  getLeft(): number {
    return this.reduceClassifiers((acc, classifier) => {
      const left = classifier.getLeft();
      return acc > left ? left : acc;
    }, Infinity);
  }

  getRight(): number {
    return this.reduceClassifiers((acc, classifier) => {
      const right = classifier.getRight();
      return acc < right ? right : acc;
    }, -Infinity);
  }

  private reduceClassifiers(
    reducer: (acc: number, classifier: Classifier) => number,
    seed: number,
  ): number {
    let acc = seed;
    for (const classifier of this.getChildren()) {
      if (classifier instanceof Classifier) {
        acc = reducer(acc, classifier);
      }
    }

    if (acc === seed) {
      return 0;
    }

    return acc;
  }
}

export default Diagram;
