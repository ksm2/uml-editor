import { DispatchWithoutAction } from "react";
import { FormattedMessage } from "react-intl";
import { DropdownItem, Icon } from "../blocks";

interface Props {
  onZoom: DispatchWithoutAction;
}

function ZoomIn({ onZoom }: Props) {
  function handleClick() {
    onZoom();
  }

  return (
    <DropdownItem onClick={handleClick} shortcut="Ctrl-Plus">
      <Icon name="zoom-in" /> <FormattedMessage id="view.zoomIn" defaultMessage="Zoom In" />
    </DropdownItem>
  );
}

export default ZoomIn;
