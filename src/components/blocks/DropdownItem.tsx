import classNames from "classnames";
import { MouseEvent, ReactNode } from "react";

interface Props {
  onClick?: () => void;
  children?: ReactNode;
}

function DropdownItem({ onClick, children }: Props) {
  function handleClick(event: MouseEvent) {
    event.preventDefault();
    onClick?.();
  }

  return (
    <li>
      <button onClick={handleClick} className={classNames("btn", "btn-link", "dropdown-item")}>
        {children}
      </button>
    </li>
  );
}

export default DropdownItem;
