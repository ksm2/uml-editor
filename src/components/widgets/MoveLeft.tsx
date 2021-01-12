import { DispatchWithoutAction } from "react";
import { FormattedMessage } from "react-intl";
import { DropdownItem, Icon } from "../blocks";

interface Props {
  onMove: DispatchWithoutAction;
}

function MoveLeft({ onMove }: Props) {
  function handleClick() {
    onMove();
  }

  return (
    <DropdownItem onClick={handleClick} shortcut="ArrowLeft">
      <Icon name="arrow-left-square" />{" "}
      <FormattedMessage id="view.moveLeft" defaultMessage="Move Left" />
    </DropdownItem>
  );
}

export default MoveLeft;
