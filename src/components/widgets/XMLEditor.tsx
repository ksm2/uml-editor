import Editor from "../blocks/Editor";

interface Props {
  xml: string;
  onChange: (xml: string) => void;
}

function XMLEditor({ xml, onChange }: Props) {
  return (
    <div className="XMLEditor" style={{ gridArea: "xml" }}>
      <Editor language="xml" value={xml} onChange={onChange} />
    </div>
  );
}

export default XMLEditor;
