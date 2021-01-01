import { Style } from "../../css";
import { Diagram } from "../../model";
import { MenuBar, Menu } from "../blocks";
import PNGExport from "./PNGExport";

interface Props {
  diagram: Diagram;
  style: Style;
}

function AppMenu({ diagram, style }: Props) {
  return (
    <MenuBar>
      <Menu title="Export">
        <PNGExport diagram={diagram} style={style} />
      </Menu>
    </MenuBar>
  );
}

export default AppMenu;
