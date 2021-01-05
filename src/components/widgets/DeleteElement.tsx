import { Dispatch } from "react";
import { FormattedMessage } from "react-intl";
import { Element, Relationship } from "../../model";
import { File } from "../../utils";
import { DropdownItem, Icon } from "../blocks";

interface Props {
  file: File;
  onDeleteElement: Dispatch<Element>;
}

function DeleteElement({ file, onDeleteElement }: Props) {
  function handleClick(): void {
    for (const element of file.model) {
      if (element.isSelected()) {
        onDeleteElement(element);
      } else if (element instanceof Relationship) {
        if (element.to.isSelected() || element.from.isSelected()) {
          onDeleteElement(element);
        }
      }
    }
  }

  return (
    <DropdownItem onClick={handleClick} shortcut="Delete">
      <Icon name="file-x" /> <FormattedMessage id="edit.delete" defaultMessage="Delete" />
    </DropdownItem>
  );
}

export default DeleteElement;
