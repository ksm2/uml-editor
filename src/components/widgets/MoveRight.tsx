import { DispatchWithoutAction } from "react";
import { FormattedMessage } from "react-intl";
import { DropdownItem, Icon } from "../blocks";

interface Props {
  onMove: DispatchWithoutAction;
}

function MoveRight({ onMove }: Props) {
  function handleClick() {
    onMove();
  }

  return (
    <DropdownItem onClick={handleClick} shortcut="ArrowRight">
      <Icon name="arrow-right-square" />{" "}
      <FormattedMessage id="view.moveRight" defaultMessage="Move Right" />
    </DropdownItem>
  );
}

export default MoveRight;
