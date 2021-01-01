import { ReactNode } from "react";

interface Props {
  labelledBy: string;
  children?: ReactNode;
}

function DropdownMenu({ labelledBy, children }: Props) {
  return (
    <ul className="dropdown-menu" aria-labelledby={labelledBy}>
      {children}
    </ul>
  );
}

export default DropdownMenu;
