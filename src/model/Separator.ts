import AbstractElement from "./AbstractElement";
import Renderer from "./Renderer";

class Separator extends AbstractElement {
  render(renderer: Renderer): void {
    renderer.renderSeparator(this);
  }
}

export default Separator;
