import { Classifier, Shape } from "../model";

class Note extends Classifier {
  shape: Shape = Shape.NOTE;

  getTagName(): string {
    return "Note";
  }
}

export default Note;
