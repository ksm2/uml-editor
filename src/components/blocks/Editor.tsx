import CodeMirror from "codemirror";
import { useEffect, useRef } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/xml-hint";
import "codemirror/mode/xml/xml";
import "codemirror/mode/css/css";
import "codemirror/theme/nord.css";
import "codemirror/addon/hint/show-hint.css";
import "./Editor.css";

interface Props {
  language: "css" | "xml";
  value: string;
  schema?: any;
  onChange?: (value: string) => void;
}

function completeAfter(cm: CodeMirror.Editor, pred?: () => boolean) {
  if (pred?.())
    setTimeout(() => {
      if (!cm.state.completionActive) cm.showHint({ completeSingle: false });
    }, 100);
  return CodeMirror.Pass;
}

function completeIfAfterLt(cm: CodeMirror.Editor) {
  return completeAfter(cm, () => {
    const cur = cm.getCursor();
    return cm.getRange(CodeMirror.Pos(cur.line, cur.ch - 1), cur) === "<";
  });
}

function completeIfInTag(cm: CodeMirror.Editor) {
  return completeAfter(cm, () => {
    const tok = cm.getTokenAt(cm.getCursor());
    if (
      tok.type === "string" &&
      (!/['"]/.test(tok.string.charAt(tok.string.length - 1)) ||
        tok.string.length === 1)
    )
      return false;
    const inner = CodeMirror.innerMode(cm.getMode(), tok.state).state;
    return inner.tagName;
  });
}

function Editor({ language, value, schema, onChange }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const mode = language === "xml" ? "xml" : "text/x-scss";
    const hintOptions = { schemaInfo: schema } as any;
    const codeMirror = CodeMirror.fromTextArea(ref.current!, {
      mode,
      lineNumbers: true,
      theme: "nord",
      extraKeys: {
        "'<'": completeAfter,
        "'/'": completeIfAfterLt,
        "' '": completeIfInTag,
        "'='": completeIfInTag,
        "Ctrl-Space": "autocomplete",
      },
      hintOptions,
    });

    codeMirror.on("change", () => {
      onChange?.(codeMirror.getValue());
    });

    return () => {
      codeMirror.toTextArea();
    };
  }, [language, schema, onChange]);

  return <textarea ref={ref} defaultValue={value} />;
}

export default Editor;
