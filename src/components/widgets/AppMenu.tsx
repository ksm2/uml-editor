import { Dispatch } from "react";
import { ViewOptions, File, SerializableFile } from "../../utils";
import { DropdownDivider, Menu, MenuBar } from "../blocks";
import FileNew from "./FileNew";
import FileOpen from "./FileOpen";
import FileRename from "./FileRename";
import FileSave from "./FileSave";
import Grid from "./Grid";
import PNGExport from "./PNGExport";

interface Props {
  file: File;
  viewOptions: ViewOptions;
  onFileChange: Dispatch<SerializableFile>;
  onViewOptionsChange: Dispatch<ViewOptions>;
}

function AppMenu({ file, viewOptions, onFileChange, onViewOptionsChange }: Props) {
  return (
    <MenuBar>
      <Menu title="File">
        <FileNew onFileChange={onFileChange} />
        <DropdownDivider />
        <FileOpen onFileChange={onFileChange} />
        <FileSave file={file} />
        <DropdownDivider />
        <FileRename file={file} onTitleChange={(title) => onFileChange({ ...file, title })} />
      </Menu>

      <Menu title="View">
        <Grid viewOptions={viewOptions} onViewOptionsChange={onViewOptionsChange} />
      </Menu>

      <Menu title="Export">
        <PNGExport file={file} />
      </Menu>
    </MenuBar>
  );
}

export default AppMenu;
