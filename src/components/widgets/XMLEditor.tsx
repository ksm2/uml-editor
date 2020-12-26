import Editor from "../blocks/Editor";
import { xmlSchema } from "../schemas";

interface Props {
  xml: string;
  onChange: (xml: string) => void;
}

function XMLEditor({ xml, onChange }: Props) {
  return (
    <div className="XMLEditor" style={{ gridArea: "xml" }}>
      <Editor
        language="xml"
        value={xml}
        schema={xmlSchema}
        onChange={onChange}
      />
    </div>
  );
}

export default XMLEditor;
