import { Dispatch } from "react";
import { FormattedMessage } from "react-intl";
import { Element } from "../../model";
import { File } from "../../utils";
import { DropdownItem, Icon } from "../blocks";

interface Props {
  file: File;
  onAddElement: Dispatch<Element>;
}

function DuplicateElement({ file, onAddElement }: Props) {
  function handleClick(): void {
    const elementsToDuplicate = new Set<Element>();
    for (const element of file.model) {
      if (element.isSelected()) {
        elementsToDuplicate.add(element);
        element.setSelected(false);
      }
    }

    for (const element of elementsToDuplicate) {
      const clone = element.clone();
      clone.setSelected(true);
      for (const child of element.getChildren()) {
        const childClone = child.clone();
        clone.addChild(childClone);
      }
      onAddElement(clone);
    }
  }

  return (
    <DropdownItem onClick={handleClick} shortcut="Ctrl-D">
      <Icon name="files" /> <FormattedMessage id="edit.duplicate" defaultMessage="Duplicate" />
    </DropdownItem>
  );
}

export default DuplicateElement;
