import { useEffect, useRef } from "react";

function useShortcut(shortcut: string | undefined, handler: () => void): void {
  const ref = useRef(handler);

  useEffect(() => {
    function keypressHandler(event: KeyboardEvent) {
      if (shortcut !== undefined && matchesShortcut(shortcut, event)) {
        event.preventDefault();
        ref.current();
      }
    }

    document.addEventListener("keydown", keypressHandler);
    return () => {
      document.removeEventListener("keydown", keypressHandler);
    };
  }, [shortcut]);

  useEffect(() => {
    ref.current = handler;
  });
}

function matchesShortcut(shortcut: string, event: KeyboardEvent) {
  let result = true;

  const elements = shortcut.split("-");
  for (const element of elements) {
    if (element === "Ctrl") {
      result = result && event.ctrlKey;
    } else if (element === "Shift") {
      result = result && event.shiftKey;
    } else if (element === "Alt") {
      result = result && event.altKey;
    } else if (element === "Plus") {
      result = result && (event.key === "=" || event.key === "+");
    } else if (element === "Minus") {
      result = result && event.key === "-";
    } else {
      result = result && event.key.toLowerCase() === element.toLowerCase();
    }
  }

  return result;
}

export default useShortcut;
