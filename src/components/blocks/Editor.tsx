import CodeMirror from "codemirror";
import { MutableRefObject, useEffect, useRef } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/xml-hint";
import "codemirror/addon/comment/comment";
import "codemirror/addon/edit/matchtags";
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
      (!/['"]/.test(tok.string.charAt(tok.string.length - 1)) || tok.string.length === 1)
    )
      return false;
    const inner = CodeMirror.innerMode(cm.getMode(), tok.state).state;
    return inner.tagName;
  });
}

function Editor({ language, value, schema, onChange }: Props) {
  const onChangeRef = useRef(onChange);
  const ref = useRef<HTMLTextAreaElement>(null);
  const editor = useRef<CodeMirror.Editor>(null) as MutableRefObject<CodeMirror.Editor>;

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    const mode = language === "xml" ? "xml" : "text/x-scss";
    const hintOptions = { schemaInfo: schema } as any;
    const codeMirror = CodeMirror.fromTextArea(ref.current!, {
      mode,
      lineNumbers: true,
      theme: "nord",
      matchTags: true,
      autocorrect: true,
      extraKeys: {
        "'<'": completeAfter,
        "'/'": completeIfAfterLt,
        "' '": completeIfInTag,
        "'='": completeIfInTag,
        "Ctrl-Space": "autocomplete",
        "Ctrl-/": "toggleComment",
      },
      hintOptions,
    });
    editor.current = codeMirror;

    return () => {
      codeMirror.toTextArea();
    };
  }, [language, schema]);

  useEffect(() => {
    if (editor.current!.getValue() !== value) {
      editor.current!.setValue(value);
    }

    function handleChange() {
      const newValue = editor.current!.getValue();
      if (newValue !== value) {
        onChangeRef.current?.(newValue);
      }
    }

    editor.current!.on("change", handleChange);
    return () => {
      editor.current!.off("change", handleChange);
    };
  }, [value]);

  return <textarea ref={ref} defaultValue={value} />;
}

export default Editor;
