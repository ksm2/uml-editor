import AbstractElement from "./AbstractElement";
import Renderer from "./Renderer";

class Text extends AbstractElement {
  readonly text: string;

  constructor(text: string) {
    super();
    this.text = text;
  }

  render(renderer: Renderer): void {
    renderer.renderText(this);
  }
}

export default Text;
