import classNames from "classnames";
import "./Flag.css";

interface Props {
  country: string;
}

function Flag({ country }: Props) {
  return <span className={classNames("Flag me-2", country)} />;
}

export default Flag;
