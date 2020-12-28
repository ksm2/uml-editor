import { useState } from "react";
import { serializer } from "../serializer";
import "./App.css";
import { AppMenu, Canvas, CSSEditor, XMLEditor } from "./widgets";

function App() {
  const [xml, setXml] = useState(`\
<?xml version="1.0" encoding="UTF-8" ?>
<Diagram>
  <Interface id="i1" anchor="s" x="0" y="-50">
    <Stereotype/>
    <Title>Visitor</Title>
  </Interface>

  <Class id="c1" anchor="n" x="0" y="50" width="400">
    <Stereotype/>
    <Title>Concrete Visitor</Title>
    <Separator/>
    <Method>visitSomething(something: Something)</Method>
  </Class>

  <Implementation from="c1" to="i1" fromAnchor="n" toAnchor="s"/>
</Diagram>
`);
  const diagram = serializer.deserialize(xml);

  return (
    <div className="App bg-secondary">
      <AppMenu />
      <XMLEditor xml={xml} onChange={setXml} />
      <CSSEditor />
      <Canvas diagram={diagram} />
    </div>
  );
}

export default App;
