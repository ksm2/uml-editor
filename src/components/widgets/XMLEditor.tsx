import { useStore } from "../../modules";
import { Editor } from "../blocks";
import { xmlSchema } from "../schemas";

function XMLEditor() {
  const { xml, dispatch } = useStore("xml");

  return (
    <div className="XMLEditor" style={{ gridArea: "xml", position: "relative" }}>
      <Editor
        language="xml"
        value={xml}
        schema={xmlSchema}
        onChange={(xml) => dispatch("file/xml", xml)}
      />
    </div>
  );
}

export default XMLEditor;
