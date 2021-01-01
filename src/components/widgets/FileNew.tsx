import { Dispatch } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { INITIAL_CSS, INITIAL_XML } from "../../constants";
import { SerializableFile } from "../../utils";
import { DropdownItem, Icon } from "../blocks";

interface Props {
  onFileChange: Dispatch<SerializableFile>;
}

function FileNew({ onFileChange }: Props) {
  const intl = useIntl();

  function handleClick() {
    const untitled = intl.formatMessage({ id: "untitled", defaultMessage: "Untitled" });
    const message = intl.formatMessage({
      id: "file.new.message",
      defaultMessage: "Choose a title for the new document",
    });
    const title = window.prompt(message, untitled);
    if (title !== null) {
      onFileChange({
        title,
        css: INITIAL_CSS,
        xml: INITIAL_XML,
      });
    }
  }

  return (
    <DropdownItem onClick={handleClick}>
      <Icon name="file-earmark-plus" /> <FormattedMessage id="file.new" defaultMessage="New ..." />
    </DropdownItem>
  );
}

export default FileNew;
