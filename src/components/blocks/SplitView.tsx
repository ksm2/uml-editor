import classNames from "classnames";
import { ReactNode } from "react";
import "./SplitView.css";

interface Props {
  direction: "horizontal" | "vertical";
  children: ReactNode;
}

function SplitView({ direction, children }: Props) {
  return <div className={classNames("SplitView", direction)}>{children}</div>;
}

export default SplitView;
