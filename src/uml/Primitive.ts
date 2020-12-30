import { Classifier } from "../model";

class Primitive extends Classifier {
  getTagName(): string {
    return "Primitive";
  }
}

export default Primitive;
