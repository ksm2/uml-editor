import { Dispatch } from "react";
import { INITIAL_CSS, INITIAL_XML } from "../../constants";
import { SerializableFile } from "../../utils";
import { DropdownItem } from "../blocks";

interface Props {
  onFileChange: Dispatch<SerializableFile>;
}

function FileNew({ onFileChange }: Props) {
  function handleClick() {
    onFileChange({
      title: window.prompt("Choose a title for the new document:", "Untitled") ?? "Untitled",
      css: INITIAL_CSS,
      xml: INITIAL_XML,
    });
  }

  return <DropdownItem onClick={handleClick}>New ...</DropdownItem>;
}

export default FileNew;
