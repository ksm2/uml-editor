import { ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import ContainerFluid from "./ContainerFluid";
import logo from "./logo.png";

interface Props {
  children?: ReactNode;
}

function MenuBar({ children }: Props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ gridArea: "menu" }}>
      <ContainerFluid>
        <span className="navbar-brand">
          <img alt="Logo" src={logo} height={32} width={32} className="d-inline-block align-top" />{" "}
          <FormattedMessage id="title" defaultMessage="UML Editor" />
        </span>
        <ul className="navbar-nav me-auto d-flex flex-grow-1">{children}</ul>
      </ContainerFluid>
    </nav>
  );
}

export default MenuBar;
