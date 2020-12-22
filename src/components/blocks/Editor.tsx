import CodeMirror from "codemirror";
import { useEffect, useRef } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/css/css";
import "codemirror/theme/nord.css";
import "./Editor.css";

interface Props {
  language: "css" | "xml";
  children?: string;
}

function Editor({ language, children }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const mode = language === "xml" ? "xml" : "text/x-scss";
    const codeMirror = CodeMirror.fromTextArea(ref.current!, {
      mode,
      lineNumbers: true,
      theme: "nord",
    });

    return () => {
      codeMirror.toTextArea();
    };
  });

  return <textarea ref={ref}>{children}</textarea>;
}

export default Editor;
