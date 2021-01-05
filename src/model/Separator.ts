import AbstractElement from "./AbstractElement";
import Renderer from "./Renderer";

class Separator extends AbstractElement {
  render(renderer: Renderer): void {
    renderer.renderSeparator(this);
  }

  getTagName(): string {
    return "Separator";
  }

  clone(): Separator {
    return new Separator();
  }
}

export default Separator;
