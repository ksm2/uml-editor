import { Dispatch } from "react";
import { FormattedMessage } from "react-intl";
import { fileSerializer } from "../../serializer";
import { SerializableFile, uploadFile } from "../../utils";
import { DropdownItem, Icon } from "../blocks";

interface Props {
  onFileChange: Dispatch<SerializableFile>;
}

function FileOpen({ onFileChange }: Props) {
  function handleClick() {
    uploadFile(".uml").then((content) => {
      const file = fileSerializer.loadFromString(content);
      onFileChange(file);
    });
  }

  return (
    <DropdownItem onClick={handleClick} shortcut="Ctrl-O">
      <Icon name="folder" /> <FormattedMessage id="file.open" defaultMessage="Open ..." />
    </DropdownItem>
  );
}

export default FileOpen;
