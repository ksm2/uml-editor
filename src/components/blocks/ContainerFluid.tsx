import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

function ContainerFluid({ children }: Props) {
  return <div className="container-fluid">{children}</div>;
}

export default ContainerFluid;
