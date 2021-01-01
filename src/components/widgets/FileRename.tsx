import { Dispatch } from "react";
import { DropdownItem } from "../blocks";

interface Props {
  title: string;
  onTitleChange: Dispatch<string>;
}

function FileRename({ title, onTitleChange }: Props) {
  function handleClick(): void {
    const newTitle = window.prompt("New document title", title);
    if (newTitle !== null) {
      onTitleChange(newTitle);
    }
  }

  return <DropdownItem onClick={handleClick}>Rename "{title}" ...</DropdownItem>;
}

export default FileRename;
