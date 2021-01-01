import { Dispatch } from "react";
import { MenuBar, Menu } from "../blocks";
import { File } from "../../utils";
import FileRename from "./FileRename";
import FileSave from "./FileSave";
import PNGExport from "./PNGExport";

interface Props {
  file: File;
  onTitleChange: Dispatch<string>;
}

function AppMenu({ file, onTitleChange }: Props) {
  return (
    <MenuBar>
      <Menu title="File">
        <FileSave file={file} />
        <FileRename file={file} onTitleChange={onTitleChange} />
      </Menu>
      <Menu title="Export">
        <PNGExport file={file} />
      </Menu>
    </MenuBar>
  );
}

export default AppMenu;
