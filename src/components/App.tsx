import { useState } from "react";
import { serializer } from "../serializer";
import "./App.css";
import { AppMenu, Canvas, CSSEditor, XMLEditor } from "./widgets";

function App() {
  const [xml, setXml] = useState(`\
<?xml version="1.0" encoding="UTF-8" ?>
<Diagram>
  <Interface id="i1" anchor="s" x="0" y="-50">
    <Title>Interface</Title>
  </Interface>

  <Class id="c1" anchor="n" x="0" y="50">
    <Title>Class</Title>
    <Separator/>
    <Method>hello()</Method>
  </Class>

  <Implementation from="c1" to="i1" fromAnchor="n" toAnchor="s" fromTip="filled_diamond" toTip="triangle"/>
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
