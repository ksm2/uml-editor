import CodeMirror from "codemirror";
import { useEffect, useRef } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/css/css";
import "codemirror/theme/nord.css";
import "./Editor.css";

interface Props {
  language: "css" | "xml";
  value: string;
  onChange?: (value: string) => void;
}

function Editor({ language, value, onChange }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const mode = language === "xml" ? "xml" : "text/x-scss";
    const codeMirror = CodeMirror.fromTextArea(ref.current!, {
      mode,
      lineNumbers: true,
      theme: "nord",
    });

    codeMirror.on("change", () => {
      onChange?.(codeMirror.getValue());
    });

    return () => {
      codeMirror.toTextArea();
    };
  }, [language, onChange]);

  return <textarea ref={ref} defaultValue={value} />;
}

export default Editor;
