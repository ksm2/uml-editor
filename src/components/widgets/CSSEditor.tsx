import { Editor } from "../blocks";

interface Props {
  css: string;
  onChange?: (css: string) => void;
}

function CSSEditor({ css, onChange }: Props) {
  return (
    <div className="CSSEditor" style={{ gridArea: "css", position: "relative" }}>
      <Editor language="css" value={css} onChange={onChange} />
    </div>
  );
}

export default CSSEditor;
