import classNames from "classnames";
import { MouseEvent, ReactNode } from "react";
import { useShortcut } from "../../hooks";
import Shortcut from "./Shortcut";

interface Props {
  onClick?: () => void;
  shortcut?: string;
  children?: ReactNode;
}

function DropdownItem({ onClick, shortcut, children }: Props) {
  function handleClick(event: MouseEvent) {
    event.preventDefault();
    onClick?.();
  }

  useShortcut(shortcut, () => {
    onClick?.();
  });

  return (
    <li>
      <button onClick={handleClick} className={classNames("btn", "btn-link", "dropdown-item")}>
        {children}
        {shortcut && <Shortcut shortcut={shortcut} />}
      </button>
    </li>
  );
}

export default DropdownItem;
