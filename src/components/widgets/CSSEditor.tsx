import Editor from "../blocks/Editor";

function CSSEditor() {
  return (
    <div className="CSSEditor" style={{ gridArea: "css" }}>
      <Editor
        language="css"
        value={`\
Interface {
  Title {
    font-style: italic;
  }
}

Class {
  Title {
    font-weight: bold;
  }
}
`}
      />
    </div>
  );
}

export default CSSEditor;
