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

  getTagName(): string {
    return "Text";
  }

  clone(): Text {
    const { constructor } = Object.getPrototypeOf(this);
    return new constructor(this.text);
  }
}

export default Text;
