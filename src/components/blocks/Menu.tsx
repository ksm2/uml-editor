import { ReactNode } from "react";
import ContainerFluid from "./ContainerFluid";

interface Props {
  children?: ReactNode;
}

function Menu({ children }: Props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <ContainerFluid>
        <span className="navbar-brand">Diagram Editor</span>
        <ul className="navbar-nav me-auto">{children}</ul>
      </ContainerFluid>
    </nav>
  );
}

export default Menu;
