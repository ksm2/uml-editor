import { useIntl } from "react-intl";

interface Props {
  shortcut: string;
}

function Shortcut({ shortcut }: Props) {
  const intl = useIntl();
  const parts = new Map([
    ["Alt", intl.formatMessage({ id: "shortcut.alt", defaultMessage: "Alt" })],
    ["ArrowLeft", intl.formatMessage({ id: "shortcut.arrowLeft", defaultMessage: "Left" })],
    ["ArrowRight", intl.formatMessage({ id: "shortcut.arrowRight", defaultMessage: "Right" })],
    ["ArrowUp", intl.formatMessage({ id: "shortcut.arrowUp", defaultMessage: "Up" })],
    ["ArrowDown", intl.formatMessage({ id: "shortcut.arrowDown", defaultMessage: "Down" })],
    ["Ctrl", intl.formatMessage({ id: "shortcut.ctrl", defaultMessage: "Ctrl" })],
    ["Delete", intl.formatMessage({ id: "shortcut.delete", defaultMessage: "Delete" })],
    ["Shift", intl.formatMessage({ id: "shortcut.shift", defaultMessage: "Shift" })],
  ]);

  const text = shortcut
    .split("-")
    .map((part) => parts.get(part) ?? part)
    .join(" ");

  return <span className="text-muted float-end">{text}</span>;
}

export default Shortcut;
