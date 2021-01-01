import { Dispatch } from "react";
import { ViewOptions } from "../../utils";
import { DropdownItem, Icon } from "../blocks";

interface Props {
  viewOptions: ViewOptions;
  onViewOptionsChange: Dispatch<ViewOptions>;
}

function Grid({ viewOptions, onViewOptionsChange }: Props) {
  const { grid } = viewOptions;
  const icon = grid ? "grid-3x3-gap-fill" : "grid-3x3-gap";

  function handleClick() {
    onViewOptionsChange({ ...viewOptions, grid: !grid });
  }

  return (
    <DropdownItem onClick={handleClick} shortcut="Alt-G">
      <Icon name={icon} /> Toggle Grid
    </DropdownItem>
  );
}

export default Grid;
