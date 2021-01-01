import { Dispatch } from "react";
import { fileSerializer } from "../../serializer";
import { SerializableFile, uploadFile } from "../../utils";
import { DropdownItem } from "../blocks";

interface Props {
  onFileChange: Dispatch<SerializableFile>;
}

function FileOpen({ onFileChange }: Props) {
  function handleClick() {
    uploadFile(".uml").then((content) => {
      const file = fileSerializer.loadFromString(content);
      onFileChange(file);
    });
  }

  return (
    <DropdownItem onClick={handleClick} shortcut="Ctrl-O">
      Open
    </DropdownItem>
  );
}

export default FileOpen;
