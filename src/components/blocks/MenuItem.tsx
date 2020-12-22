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
      <a
        href="#"
        onClick={handleClick}
        className={classNames("nav-link", { active })}
      >
        {children}
      </a>
    </li>
  );
}

export default MenuItem;
