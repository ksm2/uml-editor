import { CanvasRenderer } from "../../renderer";
import { File, sanitizeFilename } from "../../utils";
import { DropdownItem } from "../blocks";

interface Props {
  file: File;
}

const MARGIN = 10;

function PNGExport({ file }: Props) {
  function handleClick() {
    const canvas = document.createElement("canvas");
    canvas.width = file.model.getWidth() + 2 * MARGIN;
    canvas.height = file.model.getHeight() + 2 * MARGIN;

    const renderer = new CanvasRenderer(canvas, file.style, {
      translateX: MARGIN - file.model.getLeft(),
      translateY: MARGIN - file.model.getTop(),
    });
    renderer.renderDiagram(file.model);

    const dataURL = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.download = `${sanitizeFilename(file.title)}.png`;
    downloadLink.href = dataURL;
    downloadLink.click();
  }

  return <DropdownItem onClick={handleClick}>As PNG</DropdownItem>;
}

export default PNGExport;
