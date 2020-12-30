import { Classifier } from "../model";

class Object extends Classifier {
  getTagName(): string {
    return "Object";
  }
}

export default Object;
