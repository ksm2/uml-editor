import { Dispatch } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { File } from "../../utils";
import { DropdownItem, Icon } from "../blocks";

interface Props {
  file: File;
  onTitleChange: Dispatch<string>;
}

function FileRename({ file, onTitleChange }: Props) {
  const intl = useIntl();

  function handleClick(): void {
    const message = intl.formatMessage({
      id: "file.rename.message",
      defaultMessage: "New document title",
    });
    const newTitle = window.prompt(message, file.title);
    if (newTitle !== null) {
      onTitleChange(newTitle);
    }
  }

  return (
    <DropdownItem onClick={handleClick}>
      <Icon name="pencil" />{" "}
      <FormattedMessage
        id="file.rename"
        defaultMessage='Rename "{title}" ...'
        values={{ title: file.title }}
      />
    </DropdownItem>
  );
}

export default FileRename;
