import classNames from "classnames";
import { ReactNode } from "react";
import { useId } from "../../hooks";
import DropdownMenu from "./DropdownMenu";
import DropdownToggle from "./DropdownToggle";

interface Props {
  active?: boolean;
  placement?: string;
  title: ReactNode;
  children?: ReactNode;
}

function Menu({ active = false, placement, title, children }: Props) {
  const id = useId("Menu");

  return (
    <li className="nav-item dropdown">
      <DropdownToggle id={id} className={classNames("nav-link", { active })}>
        {title}
      </DropdownToggle>
      <DropdownMenu placement={placement} labelledBy={id}>
        {children}
      </DropdownMenu>
    </li>
  );
}

export default Menu;
