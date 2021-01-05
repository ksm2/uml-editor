import { Relationship } from "../model";

class Association extends Relationship {
  getTagName(): string {
    return "Association";
  }
}

export default Association;
