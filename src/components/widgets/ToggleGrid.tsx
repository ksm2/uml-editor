import { Dispatch } from "react";
import { FormattedMessage } from "react-intl";
import { DropdownItem, Icon } from "../blocks";

interface Props {
  grid: boolean;
  onChange: Dispatch<boolean>;
}

function ToggleGrid({ grid, onChange }: Props) {
  const icon = grid ? "grid-3x3-gap-fill" : "grid-3x3-gap";

  function handleClick() {
    onChange(!grid);
  }

  return (
    <DropdownItem onClick={handleClick} shortcut="Alt-G">
      <Icon name={icon} /> <FormattedMessage id="view.grid" defaultMessage="Toggle Grid" />
    </DropdownItem>
  );
}

export default ToggleGrid;
