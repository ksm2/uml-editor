import { FormattedMessage } from "react-intl";
import { MARGIN } from "../../constants";
import { SVGRenderer } from "../../renderer";
import { downloadFile, File, sanitizeFilename } from "../../utils";
import { DropdownItem, Icon } from "../blocks";

interface Props {
  file: File;
}

function SVGExport({ file }: Props) {
  function handleClick() {
    const viewBox = [
      file.model.getLeft() - MARGIN,
      file.model.getTop() - MARGIN,
      file.model.getWidth() + 2 * MARGIN,
      file.model.getHeight() + 2 * MARGIN,
    ].join(" ");
    const root = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    root.setAttribute("width", String(file.model.getWidth() + 2 * MARGIN));
    root.setAttribute("height", String(file.model.getHeight() + 2 * MARGIN));
    root.setAttribute("viewBox", viewBox);

    const renderer = new SVGRenderer(root, file.style);
    renderer.renderDiagram(file.model);

    const xmlSerializer = new XMLSerializer();
    const svg = xmlSerializer.serializeToString(root);
    const dataURL = new URL(`data:image/svg+xml;base64,${btoa(svg)}`).toString();
    downloadFile(`${sanitizeFilename(file.title)}.svg`, dataURL);
  }

  return (
    <DropdownItem onClick={handleClick} shortcut="Ctrl-Shift-E">
      <Icon name="code-slash" /> <FormattedMessage id="export.svg" defaultMessage="As SVG ..." />
    </DropdownItem>
  );
}

export default SVGExport;
