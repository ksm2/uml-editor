import { useIntl } from "react-intl";

interface Props {
  shortcut: string;
}

function Shortcut({ shortcut }: Props) {
  const intl = useIntl();
  const parts = new Map([
    ["Ctrl", intl.formatMessage({ id: "shortcut.ctrl", defaultMessage: "Ctrl" })],
    ["Alt", intl.formatMessage({ id: "shortcut.alt", defaultMessage: "Alt" })],
    ["Shift", intl.formatMessage({ id: "shortcut.shift", defaultMessage: "Shift" })],
  ]);

  const text = shortcut
    .split("-")
    .map((part) => parts.get(part) ?? part)
    .join(" ");

  return <span className="text-muted float-end">{text}</span>;
}

export default Shortcut;
