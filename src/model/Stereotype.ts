import AbstractElement from "./AbstractElement";
import Renderer from "./Renderer";

class Stereotype extends AbstractElement {
  render(renderer: Renderer): void {
    renderer.renderStereotype(this);
  }
}

export default Stereotype;
