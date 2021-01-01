import classNames from "classnames";
import { ReactNode } from "react";

interface Props {
  placement?: string;
  labelledBy: string;
  children?: ReactNode;
}

function DropdownMenu({ placement = "start", labelledBy, children }: Props) {
  return (
    <ul
      className={classNames("dropdown-menu", `dropdown-menu-${placement}`)}
      aria-labelledby={labelledBy}
    >
      {children}
    </ul>
  );
}

export default DropdownMenu;
