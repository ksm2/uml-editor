import Editor from "../blocks/Editor";

function XMLEditor() {
  return (
    <div className="XMLEditor" style={{ gridArea: "xml" }}>
      <Editor language="xml">{`\
<?xml version="1.0" encoding="UTF-8" ?>
<Diagram>
  <Interface id="i1" anchor="s" x="0" y="0">
    <Title>World</Title>
  </Interface>

  <Class id="c1" anchor="n" x="0" y="5">
    <Title>Hello</Title>
    <Separator/>
    <Method>hello()</Method>
  </Class>

  <Implementation from="c1" to="i1" fromAnchor="n" toAnchor="s"/>
</Diagram>
`}</Editor>
    </div>
  );
}

export default XMLEditor;
