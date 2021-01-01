import iconUrl from "bootstrap-icons/bootstrap-icons.svg";
import { Color } from "../../css";
import "./Icon.css";

interface Props {
  name: string;
  color?: Color;
  size?: number;
}

function Icon({ name, color = Color.DARK, size = 20 }: Props) {
  return (
    <svg className="Icon me-2" width={size} height={size} fill={color.toHexString()}>
      <use xlinkHref={`${iconUrl}#${name}`} />
    </svg>
  );
}

export default Icon;
