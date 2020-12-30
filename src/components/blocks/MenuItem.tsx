import classNames from "classnames";
import { MouseEvent, ReactNode } from "react";

interface Props {
  onClick?: () => void;
  active?: boolean;
  children?: ReactNode;
}

function MenuItem({ onClick, active = false, children }: Props) {
  function handleClick(event: MouseEvent) {
    event.preventDefault();
    onClick?.();
  }

  return (
    <li className="nav-item">
      <button
        onClick={handleClick}
        className={classNames("btn", "btn-link", "nav-link", { active })}
      >
        {children}
      </button>
    </li>
  );
}

export default MenuItem;
