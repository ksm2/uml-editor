import { Classifier } from "../model";

class Enumeration extends Classifier {
  getTagName(): string {
    return "Enumeration";
  }
}

export default Enumeration;
