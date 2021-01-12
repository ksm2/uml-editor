import { DispatchWithoutAction } from "react";
import { FormattedMessage } from "react-intl";
import { DropdownItem, Icon } from "../blocks";

interface Props {
  onMove: DispatchWithoutAction;
}

function MoveDown({ onMove }: Props) {
  function handleClick() {
    onMove();
  }

  return (
    <DropdownItem onClick={handleClick} shortcut="ArrowDown">
      <Icon name="arrow-down-square" />{" "}
      <FormattedMessage id="view.moveDown" defaultMessage="Move Down" />
    </DropdownItem>
  );
}

export default MoveDown;
