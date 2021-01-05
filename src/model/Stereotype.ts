import AbstractElement from "./AbstractElement";
import Renderer from "./Renderer";

class Stereotype extends AbstractElement {
  render(renderer: Renderer): void {
    renderer.renderStereotype(this);
  }

  getTagName(): string {
    return "Stereotype";
  }

  clone(): Stereotype {
    return new Stereotype();
  }
}

export default Stereotype;
