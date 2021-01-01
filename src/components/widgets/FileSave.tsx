import { fileSerializer } from "../../serializer";
import { File, sanitizeFilename } from "../../utils";
import { DropdownItem } from "../blocks";

interface Props {
  file: File;
}

function FileSave({ file }: Props) {
  function handleClick() {
    const content = btoa(fileSerializer.saveToString(file));
    const url = new URL(`data:text/x-uml;base64,${content}`);

    const dataURL = url.toString();
    const downloadLink = document.createElement("a");
    downloadLink.download = `${sanitizeFilename(file.title)}.uml`;
    downloadLink.href = dataURL;
    downloadLink.click();
  }

  return <DropdownItem onClick={handleClick}>Save</DropdownItem>;
}

export default FileSave;
