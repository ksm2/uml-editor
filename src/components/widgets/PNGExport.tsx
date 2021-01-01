import { Style } from "../../css";
import { Diagram } from "../../model";
import { CanvasRenderer } from "../../renderer";
import { sanitizeFilename } from "../../utils";
import { DropdownItem } from "../blocks";

interface Props {
  title: string;
  diagram: Diagram;
  style: Style;
}

const MARGIN = 10;

function PNGExport({ title, diagram, style }: Props) {
  function handleClick() {
    const canvas = document.createElement("canvas");
    canvas.width = diagram.getWidth() + 2 * MARGIN;
    canvas.height = diagram.getHeight() + 2 * MARGIN;

    const renderer = new CanvasRenderer(canvas, style, {
      translateX: MARGIN - diagram.getLeft(),
      translateY: MARGIN - diagram.getTop(),
    });
    renderer.renderDiagram(diagram);

    const dataURL = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.download = `${sanitizeFilename(title)}.png`;
    downloadLink.href = dataURL;
    downloadLink.click();
  }

  return <DropdownItem onClick={handleClick}>As PNG</DropdownItem>;
}

export default PNGExport;
