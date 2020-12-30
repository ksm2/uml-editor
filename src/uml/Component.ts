import { Classifier, Shape } from "../model";

class Component extends Classifier {
  shape: Shape = Shape.COMPONENT;

  getTagName(): string {
    return "Component";
  }
}

export default Component;
