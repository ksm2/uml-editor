import { Dispatch } from "react";
import { File } from "../../utils";
import { DropdownItem } from "../blocks";

interface Props {
  file: File;
  onTitleChange: Dispatch<string>;
}

function FileRename({ file, onTitleChange }: Props) {
  function handleClick(): void {
    const newTitle = window.prompt("New document title", file.title);
    if (newTitle !== null) {
      onTitleChange(newTitle);
    }
  }

  return <DropdownItem onClick={handleClick}>Rename "{file.title}" ...</DropdownItem>;
}

export default FileRename;
