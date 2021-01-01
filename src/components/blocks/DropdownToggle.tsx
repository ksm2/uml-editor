import { Dropdown } from "bootstrap";
import classNames from "classnames";
import { ReactNode, useRef } from "react";

interface Props {
  id?: string;
  className?: string;
  children?: ReactNode;
}

function DropdownToggle({ id, className, children }: Props) {
  const dropdown = useRef<Dropdown | null>(null);

  function handleRef(element: HTMLButtonElement | null): void {
    if (element === null) {
      dropdown.current?.dispose();
      dropdown.current = null;
    } else {
      dropdown.current = new Dropdown(element);
    }
  }

  return (
    <button
      id={id}
      ref={handleRef}
      aria-expanded="false"
      data-bs-toggle="dropdown"
      className={classNames("btn", "btn-link", "dropdown-toggle", className)}
    >
      {children}
    </button>
  );
}

export default DropdownToggle;
