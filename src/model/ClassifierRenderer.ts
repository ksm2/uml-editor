import Classifier from "./Classifier";

interface ClassifierRenderer {
  renderClassifier(classifier: Classifier): void;
  isPointInClassifier(classifier: Classifier, x: number, y: number): boolean;
}

export default ClassifierRenderer;
