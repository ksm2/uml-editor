import { useStore } from "../../modules";
import { Editor } from "../blocks";

function CSSEditor() {
  const { css, dispatch } = useStore("css");

  return (
    <div className="CSSEditor" style={{ gridArea: "css", position: "relative" }}>
      <Editor language="css" value={css} onChange={(css) => dispatch("file/css", css)} />
    </div>
  );
}

export default CSSEditor;
