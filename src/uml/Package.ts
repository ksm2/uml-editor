import { Classifier, Shape } from "../model";

class Package extends Classifier {
  shape: Shape = Shape.FOLDER;

  getTagName(): string {
    return "Package";
  }
}

export default Package;
