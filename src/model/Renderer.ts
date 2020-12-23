import Classifier from "./Classifier";
import Diagram from "./Diagram";
import Relationship from "./Relationship";

interface Renderer {
  renderDiagram(diagram: Diagram): void;
  renderClassifier(classifier: Classifier): void;
  renderRelationship(relationship: Relationship): void;
}

export default Renderer;
