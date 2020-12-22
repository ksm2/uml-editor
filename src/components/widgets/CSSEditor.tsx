import Editor from "../blocks/Editor";

function CSSEditor() {
  return (
    <div className="CSSEditor" style={{ gridArea: "css" }}>
      <Editor language="css">{`\
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
`}</Editor>
    </div>
  );
}

export default CSSEditor;
