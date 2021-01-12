import { DispatchWithoutAction } from "react";
import { FormattedMessage } from "react-intl";
import { DropdownItem, Icon } from "../blocks";

interface Props {
  onZoom: DispatchWithoutAction;
}

function ZoomOut({ onZoom }: Props) {
  function handleClick() {
    onZoom();
  }

  return (
    <DropdownItem onClick={handleClick} shortcut="Ctrl-Minus">
      <Icon name="zoom-out" /> <FormattedMessage id="view.zoomOut" defaultMessage="Zoom Out" />
    </DropdownItem>
  );
}

export default ZoomOut;
