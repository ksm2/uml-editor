import Classifier from "./Classifier";
import Diagram from "./Diagram";
import Relationship from "./Relationship";
import Separator from "./Separator";
import Text from "./Text";

interface Renderer {
  renderDiagram(diagram: Diagram): void;
  renderClassifier(classifier: Classifier): void;
  renderRelationship(relationship: Relationship): void;
  renderText(text: Text): void;
  renderSeparator(separator: Separator): void;
}

export default Renderer;
