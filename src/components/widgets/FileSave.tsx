import { fileSerializer } from "../../serializer";
import { downloadFile, File, sanitizeFilename } from "../../utils";
import { DropdownItem, Icon } from "../blocks";

interface Props {
  file: File;
}

function FileSave({ file }: Props) {
  function handleClick() {
    const content = btoa(fileSerializer.saveToString(file));
    const url = new URL(`data:text/x-uml;base64,${content}`);

    downloadFile(`${sanitizeFilename(file.title)}.uml`, url.toString());
  }

  return (
    <DropdownItem onClick={handleClick} shortcut="Ctrl-S">
      <Icon name="cloud-download" /> Save
    </DropdownItem>
  );
}

export default FileSave;
