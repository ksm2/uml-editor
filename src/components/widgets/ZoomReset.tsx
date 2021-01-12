import { DispatchWithoutAction } from "react";
import { FormattedMessage } from "react-intl";
import { DropdownItem, Icon } from "../blocks";

interface Props {
  onZoom: DispatchWithoutAction;
}

function ZoomReset({ onZoom }: Props) {
  function handleClick() {
    onZoom();
  }

  return (
    <DropdownItem onClick={handleClick} shortcut="Ctrl-0">
      <Icon name="search" /> <FormattedMessage id="view.zoomReset" defaultMessage="Zoom Reset" />
    </DropdownItem>
  );
}

export default ZoomReset;
