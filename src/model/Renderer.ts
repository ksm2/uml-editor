import Classifier from "./Classifier";
import Diagram from "./Diagram";
import Relationship from "./Relationship";
import Separator from "./Separator";
import Stereotype from "./Stereotype";
import Text from "./Text";
import Title from "./Title";

interface Renderer {
  renderDiagram(diagram: Diagram): void;
  renderClassifier(classifier: Classifier): void;
  renderRelationship(relationship: Relationship): void;
  renderText(text: Text): void;
  renderTitle(title: Title): void;
  renderSeparator(separator: Separator): void;
  renderStereotype(stereotype: Stereotype): void;
  isPointInClassifier(classifier: Classifier, x: number, y: number): boolean;
}

export default Renderer;
