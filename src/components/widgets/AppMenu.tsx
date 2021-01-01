import { Dispatch } from "react";
import { File, SerializableFile } from "../../utils";
import { DropdownDivider, Menu, MenuBar } from "../blocks";
import FileOpen from "./FileOpen";
import FileRename from "./FileRename";
import FileSave from "./FileSave";
import PNGExport from "./PNGExport";

interface Props {
  file: File;
  onFileChange: Dispatch<SerializableFile>;
}

function AppMenu({ file, onFileChange }: Props) {
  return (
    <MenuBar>
      <Menu title="File">
        <FileOpen onFileChange={onFileChange} />
        <FileSave file={file} />
        <DropdownDivider />
        <FileRename file={file} onTitleChange={(title) => onFileChange({ ...file, title })} />
      </Menu>
      <Menu title="Export">
        <PNGExport file={file} />
      </Menu>
    </MenuBar>
  );
}

export default AppMenu;
