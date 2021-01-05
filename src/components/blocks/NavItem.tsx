import classNames from "classnames";
import { ReactNode } from "react";

interface Props {
  className?: string;
  children?: ReactNode;
}

function NavItem({ className, children }: Props) {
  return <li className={classNames("nav-item", className)}>{children}</li>;
}

export default NavItem;
