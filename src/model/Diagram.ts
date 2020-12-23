import AbstractElement from "./AbstractElement";
import Renderer from "./Renderer";

class Diagram extends AbstractElement {
  render(renderer: Renderer): void {
    renderer.renderDiagram(this);
  }
}

export default Diagram;
