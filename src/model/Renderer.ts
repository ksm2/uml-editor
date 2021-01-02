import ClassifierRenderer from "./ClassifierRenderer";
import Diagram from "./Diagram";
import Relationship from "./Relationship";
import RelationshipRenderer from "./RelationshipRenderer";
import Separator from "./Separator";
import Stereotype from "./Stereotype";
import Text from "./Text";
import Title from "./Title";

interface Renderer extends ClassifierRenderer, RelationshipRenderer {
  renderDiagram(diagram: Diagram): void;
  renderText(text: Text): void;
  renderTitle(title: Title): void;
  renderSeparator(separator: Separator): void;
  renderStereotype(stereotype: Stereotype): void;
}

export default Renderer;
