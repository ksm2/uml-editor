import { DispatchWithoutAction } from "react";
import { FormattedMessage } from "react-intl";
import { DropdownItem, Icon } from "../blocks";

interface Props {
  onMove: DispatchWithoutAction;
}

function MoveUp({ onMove }: Props) {
  function handleClick() {
    onMove();
  }

  return (
    <DropdownItem onClick={handleClick} shortcut="ArrowUp">
      <Icon name="arrow-up-square" /> <FormattedMessage id="view.moveUp" defaultMessage="Move Up" />
    </DropdownItem>
  );
}

export default MoveUp;
