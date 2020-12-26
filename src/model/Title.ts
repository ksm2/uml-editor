import Text from "./Text";
import Renderer from "./Renderer";

class Title extends Text {
  render(renderer: Renderer): void {
    renderer.renderTitle(this);
  }
}

export default Title;
