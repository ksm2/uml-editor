import { Dispatch } from "react";
import { Style } from "../../css";
import { Diagram } from "../../model";
import { MenuBar, Menu } from "../blocks";
import FileRename from "./FileRename";
import PNGExport from "./PNGExport";

interface Props {
  title: string;
  diagram: Diagram;
  style: Style;
  onTitleChange: Dispatch<string>;
}

function AppMenu({ title, diagram, style, onTitleChange }: Props) {
  return (
    <MenuBar>
      <Menu title="File">
        <FileRename title={title} onTitleChange={onTitleChange} />
      </Menu>
      <Menu title="Export">
        <PNGExport title={title} diagram={diagram} style={style} />
      </Menu>
    </MenuBar>
  );
}

export default AppMenu;
